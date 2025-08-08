import prisma from '../lib/prisma.js';
import {existsSync, renameSync, unlinkSync} from 'fs';
import path from 'path';


export const addGig = async(req,res,next) => {
  try{
    if(req.files){
      const destinationDirectory = "uploads/gigs";
    
    // Check if the directory exists, and create it if it doesn't
    if (!existsSync(destinationDirectory)) {
      mkdirSync(destinationDirectory, { recursive: true });
    }


      const images = [];
      req.files.forEach((file) => {
      const extension = path.extname(file.originalname);
      const fileName = `${destinationDirectory}/${Date.now()}${extension}`;
      
      renameSync(file.path, fileName);
      images.push(fileName);
    });
      if(req.body){
        const {
          title,
          description,
          category,
          features,
          price,
          revisions,
          time, shortDesc
        } = req.body;

        await prisma.gigs.create({
          data:{
            title,
            description,
            deliveryTime: parseInt(time),
            category,
            features: JSON.parse(features),
            price: parseInt(price),
            shortDesc,
            revisions: parseInt(revisions),
            createdBy: {connect: {id: req.userId}},
            images: images
          }
        });
        return res.status(201).send("Successfully created the gig");
      }
    }
    return res.status(400).send("All Properties should be required")
  }
  catch(err){
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
}
export const getUserAuthGigs = async(req,res,next) => {
  try{
        const user = await prisma.user.findUnique({
          where:{id:req.userId},
          include: {gigs: true}
        });
        return res.status(200).json({gigs: user?.gigs})
  }
  catch(err){
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};
export const getGigData = async(req,res,next) => {
  try{
    
    if(req.params.gigId){
        const gig = await prisma.gigs.findUnique({
          where:{
            id:parseInt(req.params.gigId),
            },
            include:{createdBy:true, reviews:{include:{reviewer:true}}}
        });

        const userWithGigs = await prisma.user.findUnique({
          where:{ id: gig.createdBy.id},
          include: {gigs:{include: {reviews: true}}}
        })
         if (!gig) {
        return res.status(404).send("Gig not found.");
        }
        const totalReviews = userWithGigs.gigs.reduce(
        (acc, gig) => acc + gig.reviews.length,
        0
      );

      const averageRating = (
        userWithGigs.gigs.reduce(
          (acc, gig) =>
            acc + gig.reviews.reduce((sum, review) => sum + review.rating, 0),
          0
        ) / totalReviews
      ).toFixed(1);
        return res.status(200).json({gig:{...gig,totalReviews, averageRating}, })
    }
    return res.status(400).send("Gig ID is required")
  }
  catch(err){
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const editGig = async(req,res,next) => {
  try{
    if(req.files){
      const destinationDirectory = "uploads/gigs";
    
    // Check if the directory exists, and create it if it doesn't
    if (!existsSync(destinationDirectory)) {
      mkdirSync(destinationDirectory, { recursive: true });
    }


      const images = [];
      req.files.forEach((file) => {
      const extension = path.extname(file.originalname);
      const fileName = `${destinationDirectory}/${Date.now()}${extension}`;
      
      renameSync(file.path, fileName);
      images.push(fileName);
    });
      if(req.body){
        const {
          title,
          description,
          category,
          features,
          price,
          revisions,
          time, shortDesc
        } = req.body;

        const oldData = await prisma.gigs.findUnique({
          where: {id: parseInt(req.params.gigId)},
        })

        await prisma.gigs.update({
          where: {id: parseInt(req.params.gigId)},
          data:{
            title,
            description,
            deliveryTime: parseInt(time),
            category,
            features: JSON.parse(features),
            price: parseInt(price),
            shortDesc,
            revisions: parseInt(revisions),
            createdBy: {connect: {id: req.userId}},
            images: images
          }
        });

        oldData?.images.forEach((image) => {
          if(existsSync(`uploads/gigs/${image}`)) unlinkSync(`uploads/gigs/${image}`)
        })

        return res.status(200).send("Successfully edited the gig");
      }
    }
    return res.status(400).send("All Properties should be required")
  }
  catch(err){
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
}

export const searchGigs = async(req,res,next) => {
  try{
    
    if(req.query.searchTerm || req.query.category){
        const gigs = await prisma.gigs.findMany(
          createSearchQuery(req.query.searchTerm, req.query.category)
        );
         
        return res.status(200).json({gigs})
    }
    return res.status(400).send("Search Term or Category is required.")
  }
  catch(err){
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

const createSearchQuery = (searchTerm, category) => {
  const query = {
    where: {
      OR: [],
    },
    include: {
      reviews: {
        include: {
          reviewer: true,
        },
      },
      createdBy: true,
    },
  };
  if (searchTerm) {
    query.where.OR.push({
      title: { contains: searchTerm, mode: "insensitive" },
    });
  }
  if (category) {
    query.where.OR.push({
      category: { contains: category, mode: "insensitive" },
    });
  }
  return query;
};

const checkOrder = async (userId, gigId) => {
  try {
    const hasUserOrderedGig = await prisma.orders.findFirst({
      where: {
        buyerId: parseInt(userId),
        gigId: parseInt(gigId),
        isCompleted: true,
      },
    });
    return hasUserOrderedGig;
  } catch (err) {
    console.log(err);
  }
};

export const checkGigOrder = async (req, res, next) => {
  try {
    if (req.userId && req.params.gigId) {
      const hasUserOrderedGig = await checkOrder(req.userId, req.params.gigId);
      return res
        .status(200)
        .json({ hasUserOrderedGig: hasUserOrderedGig ? true : false });
    }
    return res.status(400).send("userId and gigId is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const addReview = async (req, res, next) => {
  try {
    if (req.userId && req.params.gigId) {
      if (await checkOrder(req.userId, req.params.gigId)) {
        if (req.body.reviewText && req.body.rating) {
          const newReview = await prisma.reviews.create({
            data: {
              rating: req.body.rating,
              reviewText: req.body.reviewText,
              reviewer: { connect: { id: parseInt(req?.userId) } },
              gig: { connect: { id: parseInt(req.params.gigId) } },
            },
            include: {
              reviewer: true,
            },
          });
          return res.status(201).json({ newReview });
        }
        return res.status(400).send("ReviewText and Rating are required.");
      }
      return res
        .status(400)
        .send("You need to purchase the gig in order to add review.");
    }
    return res.status(400).send("userId and gigId is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
