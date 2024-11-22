"use client"
import React, { useState } from 'react';
import Script from 'next/script';
import { supabase } from '@/lib/supabase/products';
import { useAppSelector } from '@/lib/hooks/redux';
import { getCart } from '@/redux/cartSlice';


declare global{
    interface Window{
        Razorpay:any
    }
}


const OrderSummary = ({totalPrice}:{totalPrice:any}) => {
    const cart = useAppSelector(getCart);
    
   
    const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [amount, setAmount] = useState('0');
 const [currency, setCurrency] = useState('INR');
 const [loading, setLoading] = useState(false);
     

 
    const createOrderId = async () => {
        const {data:{user}} = await supabase.auth.getUser();  
        try {
         const response = await fetch('/api/create-order', {
          method: 'POST',
          
          headers: {
           'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items : cart,
            email : user ?.email,
            amount :parseFloat(totalPrice)*100*79,
          })
         });
         
      
         if (!response.ok) {
          throw new Error('Network response was not ok');
         }
      
         const data = await response.json();
         return data.orderId;
        } catch (error) {
         console.error('There was a problem with your fetch operation:', error);
        }
       };
       console.log(createOrderId);
       const processPayment = async () => {
       
        // e.preventDefault();
        try {
         const orderId: string = await createOrderId();
         const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ,
          amount: parseFloat(totalPrice) * 100*79,
          currency: "INR",
          name: 'Bharat-pay',
          description: 'Test Transaction',
          order_id: orderId,
          callback_url : 'http://localhost:3000/success',
          cancel_url : `${process.env.HOST}/checkout`,
          
          
        //   metadata : {
        //     email,
        //     images : JSON.stringify(items.map((item:any)=>item.image))

        //   },
       
          
          handler: async function (response: any) {
           const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
           
           };
         
           const result = await fetch('/api/verify', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
           });
           const res = await result.json();
           if (res.isOk) alert("payment succeed");
           else {
            alert(res.message);
           }
          },
          prefill: {
           name: name,
           email: email,
          },
          theme: {
           color: '#3399cc',
          },
         };
         const paymentObject = new window.Razorpay(options);
         paymentObject.on('payment.failed', function (response: any) {
          alert(response.error.description);
         });
        // Document.getElementById(Element :verify and pay).onclick = function(e){
         paymentObject.open();
        //  e.preventDefault();
        } catch (error) {
         console.log(error);
        }
       };

  return (
    <>
   
    <Script
    id="razorpay-checkout-js"
    src="https://checkout.razorpay.com/v1/checkout.js"
   />
    <div className='border border-gray p-4 mt-5 h-fit'>
        <div>
            <h1 className='font-bold'>Order Summary</h1>
            <div className='text-xs'>
                <div className='flex items-center justify-between'>
                    <p>items</p>
                    <p>{}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p>Delivery</p>
                    <p>5896</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p>Total:</p>
                    <p>{totalPrice}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p>Promotion Applied:</p>
                    <p>0</p>
                </div>
                <div className='flex text-2xl font-bold text-[#B12704] py-2 border-t border-b border-gray-300 my-1'>
                    <h1>Order Total:</h1>
                    <h1>${totalPrice}</h1>
                </div>
            </div>
            <button onClick={processPayment} className='bg-[#FFD814] w-full rounded-md px-4 py-2 my-3'> Place your order Now</button>
        </div>
      
    </div>
    </>
  )
}

export default OrderSummary
