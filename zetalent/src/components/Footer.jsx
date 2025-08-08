import Link from 'next/link'
import React from 'react'
import {FiGithub, FiInstagram, FiYoutube, FiLinkedin, FiTwitter} from "react-icons/fi"
import ZetaLogo from './ZetaLogo';
import { categories } from '@/utils/categories';
import { colors } from '@/styles/colors';
const Footer = () => {
  const socialLinks = [
    {name: "Github", icon:<FiGithub/>, link: "https://www.github.com"},
    {name:"Youtube", icon:<FiYoutube/>, link:"https://www.youtube.com/"},
    {name:"Instagram", icon:<FiInstagram/>, link:"https://www.instagram.com/"},
    {name:"LinkedIn", icon:<FiLinkedin/>, link:"https://www.linkedin.com/"},
    {name:"Twitter", icon:<FiTwitter/>, link:"https://www.twitter.com/"}
  ];
  const data = [
    {
      headerName: "Categories",
      links:[
        ...categories.map(({name})=> ({
          name,
          link:`/search/?category=${name}`,
        })),
      ],
    },
    {
      headerName:"About",
      links:[
        {name:"Careers", link: "#"},
        {name: "Press & News", link:"#"},
        {name: "Partnership", link:"#"},
        {name: "Privacy Policy", link:"#"},
        {name: "Terms of Service", link:"#"},
        {name: "Intellectual Property Claims", link:"#"},
        {name: "Investor Relations", link:"#"},
      ]
    },
    {
      headerName:"Support",
      links:[
        {name: "Help & Support", link: "#"},
        {name: "Trust & Safety", link: "#"},
        {name: "Selling on Zetalent", link: "#"},
        {name: "Buying on Zetalent", link: "#"},
      ]
    },
    {
      headerName:"Community",
      links: [
        {name: "Community Success Stories", link:"#"},
        {name: "Community Hub", link:"#"},
        {name: "Forum", link:"#"},
        {name: "Events", link:"#"},
        {name: "Blog", link:"#"},
        {name: "Influencers", link:"#"},
        {name: "Affiliates", link:"#"},
        {name: "Podcast", link:"#"},
        {name: "Invite a friend", link:"#"},
        {name: "Become a Seller", link:"#"},
        {name: "Community Standards", link:"#"},
      ]
    },
    
  ]
  return (
    <footer className='w-full mx-auto px-32 py-16 h-max border-t border-gray-200  bg-[#173d97]'>
      <ul className='flex justify-between'>
        {data.map(({headerName, links}) => {
          return(
            <li key={headerName} className='flex flex-col gap-4 '>
              <span className='font-bold'>{headerName}</span>
              <ul className='flex flex-col gap-2'>
                {links.map(({name,link}) => (
                  <li key={name} className='text-primary'>
                    <Link href={link}>{name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <div className='mt-12 flex items-center justify-between'>
        <ZetaLogo className = "text-[#404145]"/>
        <ul className='flex gap-5'>
          {socialLinks.map(({icon, link, name}) => (
            <li key={name} className='text-xl text-[#7f859e] hover:text-[#1DBF73] transition-all'>
              <Link href={link}>{icon}</Link>
            </li>
          ))}
        </ul>
       </div>
    </footer>
  )
}

export default Footer