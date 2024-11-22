"use client"
import { useSupabase } from '@/lib/hooks/useSupabase'
import Image from 'next/image'
import React, { useEffect } from 'react'
import CategoryWiseProduct from './shared/CategoryWiseProduct'


const HomePage = () => {
  const { mensProduct,
    getMensClothing,
    womensProduct,
    getWomensClothing} = useSupabase();

    useEffect(()=>{
      getMensClothing();
      getWomensClothing();

    }, [getMensClothing, getWomensClothing ])

  return (
    <div>
      <Image 
        style = {{
          maskImage:'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))'
      }}
      src={"https://images-eu.ssl-images-amazon.com/images/G/31/IMG24/Smart_Watches/MED_MAY/Tall_Hero_1500X600_BAU_NewLaunches._CB554931622_.jpg"} width={10000} height={1000} alt="banner"/>
     <div className='w-[80%] mx-auto grid grid-cols-4 gap-2 relative -top-64'>
    
     {
        mensProduct.map((product:any)=>{
          return(
          <div key={product.id}>
            <CategoryWiseProduct product={product}/>
          </div>
          )
        })
      }
       {
        womensProduct.map((product:any)=>{
          return(
          <div key={product.id}>
            <CategoryWiseProduct product={product}/>
          </div>
          )
        })
      }
     </div>
      
    </div>
  )
}

export default HomePage
