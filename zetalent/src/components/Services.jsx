'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import {categories} from "../utils/categories"

const Services = () => {
  const router = useRouter();
  return (
    <div className='mx-20 my-16'>
      <h2 className='text-4xl mb-10 text-[#404145] font-bold'>
        We deliver outcomes and expertise, not just hours.
      </h2>
      <ul className='grid grid-cols-5 gap-10'>
        {categories.map(({name, logo}) => (
          <li key={name} className='flex flex-col justify-center items-center cursor-pointer hover:shadow-2xl hover:border-[#1DBF73] border-2 border-transparent p-5 transition-all duration-500' onClick={() => router.push(`/search?category=${name}`)}>
            <Image src={""} alt='category' height={50} width={50}/>
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Services