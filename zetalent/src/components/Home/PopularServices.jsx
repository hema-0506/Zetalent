'use client'
import { useRouter } from 'next/navigation'
import React from 'react';
import Image from 'next/image';


const PopularServices = () => {
  const router = useRouter();
  const popularServicesData = [
        { name: "Ai Artists", label: "Add talent to AI", image: "/service1.png" },
    { name: "Logo Design", label: "Build your brand", image: "/service2.jpeg" },
    {
      name: "Wordpress",
      label: "Customize your site",
      image: "/service3.jpeg",
    },
    {
      name: "Voice Over",
      label: "Share your message",
      image: "/service4.jpeg",
    },
    {
      name: "Social Media",
      label: "Reach more customers",
      image: "/service5.jpeg",
    },
    { name: "SEO", label: "Unlock growth online", image: "/service6.jpeg" },
    {
      name: "Illustration",
      label: "Color your dreams",
      image: "/service7.jpeg",
    },
    { name: "Translation", label: "Go global", image: "/service8.jpeg" },
  //   {
  //     name:"Content Writing",
  //     label:"Where you can get what you thought",
  //     image:""
  //   },
  //   {
  //   name: "Graphic Design",
  //   label: "Designs that speak louder than words",
  //   image: ""
  // },
  // {
  //   name: "Web Development",
  //   label: "Bringing your digital storefront to life",
  //   image: ""
  // },
  // {
  //   name: "Video Editing",
  //   label: "Crafting stories, one frame at a time",
  //   image: ""
  // },
  // {
  //   name: "Voice Over",
  //   label: "The voice that gives your brand a soul",
  //   image: ""
  // },
  // {
  //   name: "SEO",
  //   label: "Climb the ranks, be seen, get found",
  //   image: ""
  // },
  // {
  //   name: "Social Media",
  //   label: "Engage your audience, grow your tribe",
  //   image: ""
  // },
  // {
  //   name: "Translation",
  //   label: "Bridging worlds, one word at a time",
  //   image: ""
  // }
  ]
  return (
    <div className='mx-20 my-16'>
      <h2 className='text-4xl mb-10 text-[#404145] font-bold ml-20 '>Popular Services</h2>
      <ul className='flex flex-wrap gap-16 justify-center'>
        {popularServicesData.map(({name,label, image}) => (
          <li key = {name} className='relative cursor-pointer'
          onClick={() => router.push(`/search?q-${name.toLowerCase()}`)}>
            <div className='absolute z-10 text-white left-5 top-4'>
              <span>{label}</span>
              <h6 className='font-extrabold text-2xl'>{name}</h6>
            </div>
            <div className='h-80 w-72'>
              <Image src={image} fill alt="service"/>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PopularServices