'use client'
import { useRouter } from 'next/navigation'
import React from 'react';
import Image from 'next/image';


const PopularServices = () => {
  const router = useRouter();
  const popularServicesData = [
    {
      name:"Content Writing",
      label:"Where you can get what you thought",
      image:""
    },
    {
    name: "Graphic Design",
    label: "Designs that speak louder than words",
    image: ""
  },
  {
    name: "Web Development",
    label: "Bringing your digital storefront to life",
    image: ""
  },
  {
    name: "Video Editing",
    label: "Crafting stories, one frame at a time",
    image: ""
  },
  {
    name: "Voice Over",
    label: "The voice that gives your brand a soul",
    image: ""
  },
  {
    name: "SEO",
    label: "Climb the ranks, be seen, get found",
    image: ""
  },
  {
    name: "Social Media",
    label: "Engage your audience, grow your tribe",
    image: ""
  },
  {
    name: "Translation",
    label: "Bridging worlds, one word at a time",
    image: ""
  }
  ]
  return (
    <div className='mx-20 my-16'>
      <h2 className='text-4xl mb-5 text-[#404145] font-bold'>Popular Services</h2>
      <ul className='flex flex-wrap gap-16'>
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