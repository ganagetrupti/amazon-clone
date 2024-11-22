"use client"

import React from "react";
import DeliveryAddress from "./DeliveryAddress";
import OrderSummary from "./OrderSummary";
import Image from "next/image";
import amazonLogo from '../public/amazon-logo.png'
import { FaUnlock } from "react-icons/fa6";
import { useAppSelector } from "@/lib/hooks/redux";
import { getCart } from "@/redux/cartSlice";


const CheckOut = () => {

  const cart = useAppSelector(getCart);
  let totalPrice = 0;
  cart.forEach((item:any)=>{
    totalPrice += item.price * item.quantity
  });
 
  return (
    <div className="absolute top-0 w-full p-9  bg-white">
        <div className=" flex w-[70%] mx-auto items-center justify-between border-b border-gray-400 pb-5 ">
        <div>
          <Image
            src={amazonLogo}
            alt={"amazon-logo"}
            width={150}
            height={150}
          />
        </div>
        <div>
          <h1 className="font-bold text-2xl">CheckOut</h1>
        </div>
        <div className="text-gray-400">
          <FaUnlock size={"30px"} />
        </div>
      </div>
      <div className="flex justify-between w-[70%] mx-auto">
      <DeliveryAddress/>
      <OrderSummary totalPrice={totalPrice}/>
      </div>    
    </div>
  );
};

export default CheckOut;
