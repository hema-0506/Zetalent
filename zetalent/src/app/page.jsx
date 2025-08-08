"use client"
import Companies from "@/components/Home/Companies";
import Everything from "@/components/Home/Everything";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/Home/HeroBanner";
import JoinZeta from "@/components/Home/JoinZeta";
import PopularServices from "@/components/Home/PopularServices";
import Services from "@/components/Home/Services";
import ZetaBusiness from "@/components/Home/ZetaBusiness";
import ZetaLogo from "@/components/ZetaLogo";
import React from "react";
import AuthWrapper from "@/components/AuthWrapper";
import {useStateProvider} from '@/context/StateContext'

const page = () => {
  const [{ showLoginModule, showSignupModule}] = useStateProvider();
  return (
    <div>
      {/*<ZetaLogo />*/}
      <HeroBanner />
      <Companies />
      <PopularServices />
      <Everything />
      <Services />
      <ZetaBusiness />
      <JoinZeta />
      {
        (showLoginModule || showSignupModule) && 
        (<AuthWrapper type={ showLoginModule ? "login" : "signup"}/>)
      }
    </div>
  );
};

export default page;
