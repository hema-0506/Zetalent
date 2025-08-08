import React from 'react';
import ZetaLogo from './ZetaLogo';
import { BsCheckCircle } from 'react-icons/bs';
import Image from 'next/image';

const ZetaBusiness = () => {
  return (
    <div className='bg-[#425179] px-20 py-16 flex gap-10'>
      <div className='text-white flex flex-col gap-6 justify-center items-start'>
        <div className='flex gap-2'>
          {/*<ZetaLogo fillColor={#ffffff}/>*/}
          <span className='text-white text-3xl font-bold'>Business</span>
        </div>
        <h2 className='text-3xl font-bold'>A Solution built for business</h2>
        <h4 className='text-xl'>Upgraded to a curated experience to access vetted talent and exclusive</h4>
        <ul className='flex flex-col'>
          <li className='flex gap-2 items-center'>
            <BsCheckCircle className='text-[#62646a]'/>
            <span>Talent matching</span>
          </li>
          <li className='flex gap-2 items-center'>
            <BsCheckCircle className='text-[#62646a]'/>
            <span>Dedicated account management</span>
          </li>
          <li className='flex gap-2 items-center'>
            <BsCheckCircle className='text-[#62646a]'/>
            <span>Team collaboration tools</span>
          </li>
          <li className='flex gap-2 items-center'>
            <BsCheckCircle className='text-[#62646a]'/>
            <span>Business payment solutions</span>
          </li>
        </ul>
        <button className='border text-base font-medium px-5 py-2 border-[#1DBF73] bg-[#1DBF73] text-white rounded-md' type='button'>
          Explore Zetalent Business
        </button>
      </div>
      <div className='relative h-[512px] w-2/3'>
        <Image src="" alt="business"/>
      </div>
    </div>
  )
}

export default ZetaBusiness