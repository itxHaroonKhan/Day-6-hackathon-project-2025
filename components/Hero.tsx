import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full flex justify-center">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-12 bg-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 py-8 lg:py-16">
          {/* Text Section */}
          <div className="mr-auto place-self-center lg:col-span-7 text-center lg:text-left">
            <p className="text-xs md:text-sm text-gray-500">Welcome to Chairy</p>
            <h1 className="max-w-3xl mb-4 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-none mt-4 lg:mt-7">
              Best Furniture <br className="hidden lg:block" />
              Collection for your <br className="hidden lg:block" />
              interior.
            </h1>

            <a
              href="#"
              className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium bg-teal-600 text-white border border-transparent rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 mt-6 lg:mt-12 transition"
            >
              Shop Now →
            </a>
          </div>

          {/* Image Section */}
          <div className="lg:col-span-5 flex justify-center mt-6 lg:mt-0">
            <Image
              src="/Product Image.png"
              alt="Furniture Collection"
              width={300}
              height={400}
              className="w-full h-auto max-w-[300px] md:max-w-[350px] lg:max-w-[434px]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
