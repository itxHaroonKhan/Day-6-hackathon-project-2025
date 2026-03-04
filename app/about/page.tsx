
import Image from 'next/image';
import React from 'react';
import { GoCreditCard } from "react-icons/go";
import { FaRegCheckCircle } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";

const About = () => {
  return (
    <div>
      <section className="text-gray-600">
        <div className="px-4 md:px-5 py-12 md:py-24 mx-auto">
          <div className="flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-8">
            {/* Text Section */}
            <div className="w-full lg:w-[672px] p-6 md:p-12 lg:p-20 bg-[#007580] rounded-lg">
              <h1 className="text-white text-2xl md:text-3xl mb-4 font-bold">
                About Us - Comforty
              </h1>
              <p className="text-white text-sm md:text-base leading-relaxed">
                At Comforty, we believe that the right chair can transform your space and elevate your comfort. Specializing in ergonomic design, premium materials, and modern aesthetics, we craft chairs that seamlessly blend style with functionality.
              </p>
              <button className="ml-auto text-white bg-[#F9F9F926] border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded mt-6 lg:mt-8">
                View collection
              </button>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-[672px] h-auto">
              <Image
                alt="ecommerce"
                className="w-full h-auto object-cover object-center rounded-lg"
                src="/Image Block.png"
                width={619}
                height={478}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-4 md:px-5 py-12 md:py-24 mx-auto">
          <h1 className="text-center font-bold text-xl md:text-2xl text-black pb-5">
            What makes our Brand Different
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-[#007580]">
              <div className="h-full bg-gray-100 bg-opacity-75 px-6 md:px-8 pt-6 md:pt-16 pb-6 md:pb-24 rounded-lg overflow-hidden relative">
                <Image src="/Delivery.png" alt="Delivery" width={24} height={24} />
                <h1 className="title-font text-lg md:text-xl font-medium mt-2">
                  Next day as standard
                </h1>
                <p className="text-sm md:text-base mt-2">Order before 3pm and get your order the next day as standard</p>
              </div>
            </div>

            <div className="text-[#007580]">
              <div className="h-full bg-gray-100 bg-opacity-75 px-6 md:px-8 pt-6 md:pt-12 pb-6 md:pb-24 rounded-lg overflow-hidden relative">
                <FaRegCheckCircle className="w-5 h-5 md:w-6 md:h-6 mb-2" />
                <h1 className="title-font text-lg md:text-xl font-medium mb-2 md:mb-3">
                  Made by true artisans
                </h1>
                <p className="text-sm md:text-base">
                  Handmade crafted goods made with real passion and craftmanship
                </p>
              </div>
            </div>

            <div className="text-[#007580]">
              <div className="h-full bg-gray-100 bg-opacity-75 px-6 md:px-8 pt-6 md:pt-12 pb-6 md:pb-24 rounded-lg overflow-hidden relative">
                <GoCreditCard className="w-5 h-5 md:w-6 md:h-6 mb-2" />
                <h1 className="title-font text-lg md:text-xl font-medium mb-2 md:mb-3">
                  Unbeatable prices
                </h1>
                <p className="text-sm md:text-base">
                  For our materials and quality you won&apos;t find better prices anywhere
                </p>
              </div>
            </div>

            <div className="text-[#007580]">
              <div className="h-full bg-gray-100 bg-opacity-75 px-6 md:px-8 pt-6 md:pt-12 pb-6 md:pb-24 rounded-lg overflow-hidden relative">
                <SiMongodb className="w-6 h-6 md:w-8 md:h-8 mb-2" />
                <h1 className="title-font text-lg md:text-xl font-medium mb-2 md:mb-3">
                  Recycled packaging
                </h1>
                <p className="text-sm md:text-base">
                  We use 100% recycled to ensure our footprint is more manageable
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font pb-12 md:pb-16">
        <div className="container px-4 md:px-5 py-12 md:py-24 mx-auto">
          <div className="flex w-full mb-12 md:mb-20 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-medium title-font text-gray-900">
              Our Popular Products
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <div className="w-full">
                <Image
                  alt="gallery"
                  className="w-full h-auto object-cover object-center block transform transition-all duration-300 hover:scale-105 rounded-lg"
                  src="/Large.png"
                  width={1024}
                  height={768}
                />
                <div className="mt-4">
                  <h2 className="text-lg md:text-xl text-gray-900">The Poplar suede sofa</h2>
                  <p className="text-lg md:text-xl mt-2 font-semibold">$99.00</p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full">
                  <Image
                    alt="gallery"
                    className="w-full h-auto object-cover object-center block transform transition-all duration-300 hover:scale-105 rounded-lg"
                    src="/Photo.png"
                    width={512}
                    height={384}
                  />
                  <div className="mt-4">
                    <h2 className="text-base md:text-lg text-gray-900">The Dandy chair</h2>
                    <p className="text-base md:text-lg mt-2 font-semibold">$99.00</p>
                  </div>
                </div>
                <div className="w-full">
                  <Image
                    alt="gallery"
                    className="w-full h-auto object-cover object-center block transform transition-all duration-300 hover:scale-105 rounded-lg"
                    src="/Parent.png"
                    width={512}
                    height={384}
                  />
                  <div className="mt-4">
                    <h2 className="text-base md:text-lg text-gray-900">The Dandy chair</h2>
                    <p className="text-base md:text-lg mt-2 font-semibold">$99.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
