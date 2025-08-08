"use client";
import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import { HOST, SET_USER_IMAGE, SET_USER_INFO } from "@/utils/constants";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const profile = () => {
  const [cookies] = useCookies();
  const router = useRouter();
  const [{ userInfo }, dispatch] = useStateProvider();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    userName: "",
    fullName: "",
    description: "",
  });

  useEffect(() => {
    const handleData = {...data};
    if(userInfo){
      if(userInfo?.userName) handleData.userName = userInfo?.userName;
      if(userInfo?.description) handleData.description = userInfo?.description;
      if(userInfo?.fullName) handleData.fullName = userInfo?.fullName;
    }

    if(userInfo?.imageName){
      const fileName = image;
      fetch(userInfo.imageName).then(async(response) => {
        const contentType = response.headers.get("content-type");
        const blob = await response.blob();
        //@ts-ignore
        const files = new File([blob], fileName, {contentType});
        //@ts-ignore
        setImage(files);
      });
    }

    setData(handleData);
    setIsLoaded(true);
  },[userInfo])

  const handleChange = (e) => {
    if(errorMessage) setErrorMessage("")
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    let file = e.target.files;
    const fileType = file[0]["type"];
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if(validImageTypes.includes(fileType)){
      setImage(file[0]);
    }
  }

  const setProfile = async() => {
    try{
      const response = await axios.post(
        SET_USER_INFO,
        {...data},
        {
          headers:{
            Authorization: `Bearer ${cookies.jwt}`
          }
        }
      );
      setErrorMessage("");
      let imageName = "";
      if(image){
      const formData = new FormData();
      formData.append("images", image);
      const {data: {img}} = await axios.post(SET_USER_IMAGE, formData, {
        headers:{
          Authorization: `Bearer ${cookies.jwt}`,
          "Content-Type": "multipart/form-data",
        },
      });
      imageName = img;
    }
    dispatch(
      {
        type: reducerCases.SET_USER,
        userInfo:{
          ...userInfo,
          ...data,
          image: imageName.length ? HOST + "/" + imageName : false
        }
      }
    )
      if (response.status === 200) {
        // Optional: You might want to update your global state here
        // dispatch({ type: reducerCases.SET_USER, userInfo: response.data.user });
        
        router.push("/");
      }
  }
    catch(err){
      console.error(err);
       if (err.response?.data?.userNameError) {
      setErrorMessage("This username is already taken. Please choose another.");
    } 
    // else {
    //   setErrorMessage("An unexpected error occurred. Please try again.");
    // }
    }
  }

  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500";
  const labelClassName =
    "mb-2 text-lg font-medium text-gray-900 dark:text-white";
  return (
    <>
      {isLoaded && (
        <div className="flex flex-col items-center justify-start min-h-[80vh] gap-3">
          {errorMessage && (
            <div>
              <span className="text-red-600 font-bold">{errorMessage}</span>
            </div>
          )}
          <h2 className="text-3xl">Welcome to Zetalent</h2>
          <h4 className="text-xl">
            Please complete your profile to get started
          </h4>
          <div className="flex flex-col items-center w-full gap-5">
            <label
              className="flex flex-col items-center cursor-pointer"
              onMouseEnter={() => setImageHover(true)}
              onMouseLeave={() => setImageHover(false)}
            >
              <div className={labelClassName}>Select a Profile Picture</div>
              <div className="bg-purple-500 h-36 w-36 flex items-center justify-center rounded-full relative">
                {image ? (
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="Profile"
                    fill
                    className="rounded-full"
                  />
                ) : (
                  <span className="text-6xl text-white">
                    {userInfo?.email[0].toUpperCase()}
                  </span>
                )}
                <div
                  className={`absolute bg-slate-400 h-full w-full rounded-full flex items-center justify-center transition-all duration-500 ${
                    imageHover?"opacity-100":"opacity-0"
                  }`}
                >
                  <span className={`flex items-center justify-center relative`}>
                    <svg
                      width="200"
                      height="200"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="50" cy="50" r="50" fill="#e6e6fa" />

                      <path
                        d="M 45 70 C 45 75, 55 75, 55 70 L 55 80 L 45 80 Z"
                        fill="#e0ac69"
                      />

                      <path
                        d="M 30 85 C 40 100, 60 100, 70 85 L 70 95 L 30 95 Z"
                        fill="#9b59b6"
                      />

                      <circle cx="50" cy="50" r="25" fill="#e0ac69" />

                      <g stroke="#4a3730" strokeWidth="1">
                        <path
                          d="M 25 50 
             A 25 25 0 0 1 75 50 
             C 78 30, 60 20, 50 20 
             C 40 20, 22 30, 25 50 Z"
                          fill="#5d4037"
                        />
                        <circle cx="68" cy="38" r="8" fill="#5d4037" />
                      </g>

                      <g fill="#4a3730">
                        <circle cx="40" cy="52" r="3.5" />
                        <circle cx="60" cy="52" r="3.5" />
                      </g>

                      <g
                        fill="none"
                        stroke="#4a3730"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      >
                        <path d="M 37 46 Q 40 44, 43 46" />
                        <path d="M 57 46 Q 60 44, 63 46" />
                      </g>

                      <path
                        d="M 47 63 Q 50 67, 53 63"
                        stroke="#c0392b"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                    <input
                      type="file"
                      onChange={handleFile}
                      className="opacity-0"
                      multiple={true}
                      name="profileImage"
                    />
                  </span>
                </div>
              </div>
            </label>
            <div className="flex gap-4 w-[500px]">
              <div>
                <label 
                className={labelClassName} 
                htmlFor="username">
                  Select a username
                </label>
                <input type="text" className={inputClassName} name="userName" placeholder="Username" value={data.userName} onChange={handleChange} />
              </div>
              <div>
                <label 
                className={labelClassName} 
                htmlFor="fullname">
                  Enter your fullname
                </label>
                <input type="text" className={inputClassName} name="fullName" placeholder="Fullname" value={data.fullName} onChange={handleChange} />
              </div>
            </div>
            <div className="flex flex-col w-[500px]">
            <label className={labelClassName} htmlFor="description">
              Description
            </label>
            <textarea name="description" id="description" value={data.description}
            onChange={handleChange}
            className={inputClassName}
            placeholder="Description"
            ></textarea>
            </div>
            <button className="border text-lg font-semibold px-5 py-3 border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
            type="button"
            onClick={setProfile}>Set Profile</button>
          </div>
        </div>
      )}
    </>
  );
};

export default profile;
