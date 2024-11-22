import Image from "next/image";
import React from "react";
import Ratings from "./shared/Rating";
import AddToCardContainer from "./AddToCardContainer";

const SingleProduct = ({ singleProduct }: { singleProduct: any }) => {
  return (
    <div className="w-[80%] mx-auto mt-10">
      <div className="flex justify-between">
    
          {singleProduct.map((product: any) => {
            return (
              <div className="flex">
                <div className="flex">
                  <div className="bg-gray-100">
                    <Image
                      className="mix-blend-multiply p-4"
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={200}
                    />
                  </div>
                  <div className="mx-4 w-[70%]">
                    <h1 className="font-bold text-lg">{product.title}</h1>
                    <p>{product.description}</p>
                    <Ratings ratings={product.rating} />
                    <h1 className="font-bold text-2xl">{`$${product.price}`}</h1>
                    <div>
                      <h1 className="font-bold text-sm">About this item</h1>
                      <ol>
                        <li>
                          You can watch live footage and download journey videos
                          on your Pro App by connecting to the Dashcam's WiFi
                          Hotspot
                        </li>
                        <li>
                          NIGHT VISION| Superior low light performance by class
                          A lenses, and unique Wide Dynamic Range (WDR) video
                          system. Crystal clear full high definition video
                          quality, high video quality even when driving at
                          night.
                        </li>
                        <li>
                          |TEMPERATURE RESISTANT| Made to withstand extreme
                          temperature changes in India, Dashcam Pro has an
                          operating temperature range from -5 ⁰C to 65 ⁰C.
                        </li>
                        <li>
                          |Wi-Fi COMPATIBILITY| Dashcam Pro creates a 2.4 GHz
                          wifi hotspot to connect to your phone. User can Live
                          Stream Video While Travelling in the Car and connected
                          with the device via App
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                <AddToCardContainer product={product}/>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SingleProduct;
