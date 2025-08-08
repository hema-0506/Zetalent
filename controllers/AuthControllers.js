import { Prisma} from "@prisma/client";
import prisma from "../lib/prisma.js";
import {compare, genSalt, hash} from "bcrypt";
import jwt from "jsonwebtoken";
import {renameSync} from "fs";
import path from "path";

const generatePassword = async(password) => {
  const salt = await genSalt()
  return await hash(password, salt)
};

const maxAge = 3*24*60*60;

const createToken = (email, userId) => {
  return jwt.sign({email, userId},process.env.JWT_KEY,{
    expiresIn: maxAge
  });
};

export const signup = async(req, res, next) => {
  try{
    const {email, password} = req.body;
    if(email && password){
      // 1. Check if a user with the email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      // 2. If the user exists, send a "Conflict" error
      if (existingUser) {
        return res.status(409).send("Email is already in use.");
      }

      const user = await prisma.user.create({
        data:{
          email, 
          password: await generatePassword(password)
        },
      });
      return res.status(200).json({user:{id:user.id, email: user.email},
      jwt: createToken(email, user.id)
      })
    }
    return res.status(400).send("Email and password required")
  }
  catch(err){
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
}

export const login = async(req, res, next) => {
  try{
    const {email, password} = req.body;
    if(email && password){
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if(!user){
        return res.status(400).send("User not found.");
      }
      const auth = await compare(password, user.password);

      if(!auth){
        return res.status(400).send("Invalid Password");
      }

      return res.status(200).json({user:{id:user.id, email: user.email},
      jwt: createToken(email, user.id)
      })
    }
    return res.status(400).send("Email and password required")
  }
  catch(err){
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
}

export const getUserInfo = async(req,res,next) => {
  try{
    if(req?.userId){
      const user = await prisma.user.findUnique({
        where:{
          id: req.userId,
        },
      });
      delete user.password;
      return res.status(200).json({user})
    }
  }
  catch(err){
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
}
export const setUserInfo = async(req,res,next) => {
  try{
     if (!req.userId) {
      return res.status(401).send("User not authenticated.");
    }
    const { userName, fullName, description } = req.body;
    if (userName && fullName && description) {
      // The manual findUnique check for username is removed.
      // The catch block below handles unique constraints more effectively.
      await prisma.user.update({
        where: { id: req.userId },
        data: {
          username: userName,
          fullName,
          description,
          isProfileInfoSet: true,
        },
      });
      return res.status(200).send("Profile data updated successfully");
    }
    return res.status(400).send("All fields are required.");
  }
  catch(err){
    console.error(err);
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      // P2002 is the error code for a unique constraint violation (e.g., username already exists)
      return res.status(409).json({ userNameError: true });
    }
    return res.status(500).send("Internal Server Error");
  }
}

export const setUserImage = async(req,res,next) => {
  try{
    if(req.file){
      if(req.userId){
        console.log(req.file);
        const date = Date.now();
        const extension =path.extname(req.file.originalname);
        const fileName = `uploads/profiles/${Date.now()}${extension}`;
        renameSync(req.file.path, fileName);
        await prisma.user.update({
          where: {id:req.userId},
          data:{profileImage: fileName},
        });
        return res.status(200).json({img: fileName});
      }
      return res.status(400).send("Cookie Error.");
    }
    return res.status(400).send("Image not included")
  }
  catch(err){
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
}
