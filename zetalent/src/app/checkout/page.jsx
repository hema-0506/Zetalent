// @ts-nocheck
"use client"
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { CREATE_ORDER } from "@/utils/constants";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckOutForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "react-cookie";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const gigId = params.get("gigId");
  const [cookies] = useCookies();
  useEffect(() => {
    const createOrderIntent = async () => {
      const { data } = await axios.post(
        CREATE_ORDER,
        { gigId },
        {headers:{
          Authorization: `Bearer ${cookies.jwt}`
        }
        }
      );
      setClientSecret(data.clientSecret);
    };
    if (gigId) createOrderIntent();
  }, [gigId]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-[80vh] max-w-full mx-20 flex flex-col gap-10 items-center">
      <h1 className="text-3xl">
        Please complete the payment to place the order.
      </h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm/>
        </Elements>
      )}
    </div>
  );
}

export default Checkout;