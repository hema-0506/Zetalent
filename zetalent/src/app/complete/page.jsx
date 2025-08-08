"use client"
import React, {useEffect} from 'react'
import { ORDER_SUCCESS_ROUTE } from '@/utils/constants'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const success = () => {
  const router = useRouter();
  const [cookies] = useCookies();
   const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");

  useEffect(() => {
    const changeOrderStatus = async () => {
      try {
        await axios.put(
          ORDER_SUCCESS_ROUTE,
          { paymentIntent: payment_intent },
          {
            headers:{
              Authorization: `Bearer ${cookies.jwt}`
            }
          }  
        );
      } catch (err) {
        console.error(err);
      }
    };
    console.log(payment_intent)
    if (payment_intent) {
      changeOrderStatus();
      const timer = setTimeout(() => router.push("/buyer/orders"), 5000);
      // It's good practice to clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    } else {
      router.push("/");
    }
  }, [payment_intent, router]);
  return (
    <div className="h-[80vh] flex items-center px-20 pt-20 flex-col">
      <h1 className="text-4xl text-center">
        Payment successful. You are being redirected to the orders page.
      </h1>
      <h1 className="text-4xl text-center">Please do not close the page.</h1>
    </div>
  )
}

export default success