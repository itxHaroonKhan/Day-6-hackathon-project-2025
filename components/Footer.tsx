import React from 'react';
import { FaFacebook, FaTwitter, FaPinterest, FaYoutube } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import Image from 'next/image';

const Footer = () => {
  return (
    <div>
      <footer className="text-gray-600 body-font">
        <hr />
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap md:text-left text-center order-first">

            {/* Logo and Description */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-4">
              <div className="flex items-center mb-4 justify-center sm:justify-start">
                <Image src="/Logo Icon.png" alt="Logo" width={40} height={40} />
                <h2 className="text-gray-900 font-bold text-[20px] ml-2">Comforty</h2>
              </div>
              <p className="text-gray-600 text-center sm:text-left">
                Vivamus tristique odio sit amet velit semper...
              </p>
              <div className="flex gap-4 mt-4 justify-center sm:justify-start">
                <FaFacebook className="text-xl cursor-pointer hover:text-blue-600" />
                <FaTwitter className="text-xl cursor-pointer hover:text-blue-400" />
                <IoLogoInstagram className="text-xl cursor-pointer hover:text-pink-600" />
                <FaPinterest className="text-xl cursor-pointer hover:text-red-600" />
                <FaYoutube className="text-xl cursor-pointer hover:text-red-500" />
              </div>
            </div>

            {/* Categories Section */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-4">
              <h2 className="font-medium text-gray-900 text-sm mb-3">CATEGORIES</h2>
              <ul className="list-none">
                {['Sofa', 'Armchair', 'Wing Chair', 'Desk Chair', 'Wooden Chair', 'Park Bench'].map((item, index) => (
                  <li key={index} className="text-gray-600 hover:text-gray-800 cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>

            {/* Support Section */}
            <div className="lg:w-1/5 md:w-1/2 w-full px-4 mb-4">
              <h2 className="font-medium text-gray-900 text-sm mb-3">Support</h2>
              <ul className="list-none">
                {['Help & Support', 'Terms & Conditions', 'Privacy Policy', 'Help'].map((item, index) => (
                  <li key={index} className="text-gray-600 hover:text-gray-800 cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="lg:w-1/5 md:w-1/2 w-full">
              <h2 className="font-medium text-gray-900 text-sm mb-3">Newsletter</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Your email"
                  className="bg-gray-100 border border-gray-300 py-2 px-4 rounded w-full sm:w-[240px] focus:ring-indigo-200 focus:border-indigo-500"
                />
                <button className="bg-indigo-500 text-white py-2 px-6 rounded hover:bg-indigo-600">
                  Subscribe
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
        <hr />
        {/* Footer Bottom */}
        <div className="bg-white h-[75px]">
          <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
            <p className="text-sm text-gray-500 text-center sm:text-left sm:ml-6">
              © 2021 - Comforty - Designed & Developed by <span className="text-black font-semibold">Haroon Rasheed</span>
            </p>
            <span className="sm:ml-auto mt-4 sm:mt-0 flex justify-center">
              <Image src="/Frame 69(1)(1).png" alt="Logo or Image" width={227} height={27} />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
