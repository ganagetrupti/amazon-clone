import React from 'react'
import prime from '../public/prime-logo.png'
import Image from 'next/image'
import { useAppDispatch } from '@/lib/hooks/redux'
import { addToCart } from '@/redux/cartSlice'
import { useRouter } from 'next/navigation'
const AddToCardContainer = ({product}:{product:any}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

  return (
    <div className='border border-gray-300 rounded-md h-fit text-sm'>
        <div className='p-4'>
        <Image src={prime} alt="prime" width={40} height={40}/>
        </div>
        <div className='p-4'>
        <h1 ><span className="text-[#147CBF]">Free Delivery</span> Thursday, 21 November.<span className="text-[#147CBF]">Details</span> </h1>
        <h1 className='mt-4'>Lorem ipsum dolor sit amet.</h1>
        <p className="text-[#147CBF] my-2">Deliver to suresh- Jharkhand 412563</p>

        <button onClick={() =>{
            dispatch(addToCart(product));
            router.push("/cart");
        }}

         className='bg-[#FFD814] w-full rounded-full py-1 mt-2'>Add To Cart</button>
        <button className='bg-[#FFA41C] w-full rounded-full py-1 my-2'>Buy now</button>
        </div>
   
    </div>
  )
}

export default AddToCardContainer
