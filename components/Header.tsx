"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PiShoppingCartBold } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks/redux";
import { getCart } from "@/redux/cartSlice";
import { supabase } from "@/lib/supabase/products";

const itemList = [
"All",    
"Fresh",
"MX Player",
"Sell",
'Best Sellers',
"Today's Deals",
"Mobiles",
"Electronics",
"Home & Kitchen",
"Customer Service",
"Prime",
"New Releases",
"Fashion"
]
const Header = () => {
    const [query, setQuery] = useState<string>("");
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    const cart = useAppSelector(getCart);
    const searchHandler = () =>{
        router.push(`/search/${query}`);
    }

    useEffect(()=>{
      const getUserData = async () =>{
        const {data:{user}} = await supabase.auth.getUser();
        setUser(user);
      }
      getUserData(); 
    }, [])
    console.log(user);
  return (
    <>
      <div className="bg-[#131921] text-white py-1">
        <div className="flex items-center justify-between w-[90%] mx-auto">
          <Link href={'/'} className="w-[10%]">
            <Image
              src={"/amazon-logo-2.png"}
              alt="logo"
              width={150}
              height={150}
            />
          </Link>
          <div className="w-[60%] flex items-center ">
            <input
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              type="text"
              className="w-full p-2 rounded-l-md outline-none text-black"
              placeholder="Search Amazon.in"
            />
            <div 
            onClick={searchHandler}
            className="bg-[#FEBD69] p-2 rounded-r-md">
                
              <IoMdSearch size={"24px"} />
            </div>
          </div>
          <div className="flex items-center w-[20%] justify-around">
            <div onClick={()=>{
              router.push("/signin")
            }} className="cursor-pointer">
              <h1 className="text-xs hover:underline">{`${user ? user.identities[0].identity_data.full_name:"Signin"}`}</h1>
              <h1 className="font-medium text-sm">Accounts & Lists</h1>
            </div>
            <div>
              <p className="text-xs">Returns</p>
              <h1 className="font-medium text-sm"> & Orders</h1>
            </div>
            <Link href={'/cart'} className="cursor-pointer">
              <p className="relative top-3 left-5">{cart.length}</p>
              <div className="flex">
                <div className="cursor-pointer">
                  <PiShoppingCartBold size={"40px"} />
                </div>
                <h1 className="mt-4">cart</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[#232F3E] w-full text-white p-2 flex justify-between items-center ">
        <div>
        {
            itemList.map((link, idx)=>{
                return(
                    <Link key={idx} href={`/${link}`} className="mx-2 hover:border  border:transparant hover:border-white">
                    {link}
                    </Link>
                )
            })
          }
        </div>
        <div className="mr-5">
        <h1 onClick={async()=>{
          const {error} = await supabase.auth.signOut();
          router.push("/signin")
        }} className="text-[#FEBD69] font-bold cursor-pointer hover:underline">Sign Out</h1>
        </div>   
      </div>
    </>
  );
};

export default Header;
