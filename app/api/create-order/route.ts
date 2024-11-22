import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';


const razorpay = new Razorpay({
 key_id: process.env.key_id!,
 key_secret: process.env.key_secret,
});

export async function POST(request: NextRequest) {
 const { amount, currency } = (await request.json()) as {
  amount: string;
  currency: string;
 };

 var options = {
  amount: amount,
  currency: currency,
  receipt: 'rcp1',
 };
 const order = await razorpay.orders.create(options);
 console.log(order);
 return NextResponse.json({ orderId: order.id }, { status: 200 });
}
// const arrangedItems = items.map((item:any)=>({
//     price_data : {
//         currency : 'usd',
//         product_data : {
//             name : item.title,
//             images : [item.images]
//         },
//         unit_amount : Math.floor(item.price*79),   
//     },
//     quantity : 1

//   }))