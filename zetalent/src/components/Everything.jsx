import Image from 'next/image'
import React from 'react'
import {BsCheckCircle} from 'react-icons/bs'

const Everything = () => {
  const everythingData = [
    {
      title: "Find Your Perfect Pro",
      subtitle: "Got a big idea? Get the perfect person to help you build it."
    },
    {
      title: "Budget-Friendly Brilliance",
      subtitle: " Quality work for every wallet size."
    },
    {
      title: "We're Here For You, 24/7",
      subtitle: "Friendly customer support team got your back, anytime, anywhere"
    },
    {
      title: "All Your Tools in One Place",
      subtitle: "Chat with your freelancer, share files, and track your project's progress all within our easy-to-use platform."
    },
    {
      title: "Pay with Total Confidence",
      subtitle: "Your payment is held securely in our system and is only released to the freelancer once you are 100% happy and have approved the work."
    },
    
  ]
  return (
    <div className='bg-[#f1fdf7] flex py-20 justify-between px-24'>
      <div>
        <h2 className='text-4xl mb-5 text-[#404145] font-bold'>The Best part? Everything</h2>
        <ul className='flex flex-col gap-10'>
          {everythingData.map(({title,subtitle}) => (
            <li key={title}>
              <div className='flex gap-2 items-center text-xl'>
                <BsCheckCircle className='text-[#62646a]'/>
                <h4>{title}</h4>
              </div>
              <p className='text-[#62646a]'>{subtitle}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='relative h-96 w-2/4'>
      <Image src="" fill alt="everything"/>
      </div>
    </div>
  )
}

export default Everything