import Image from "next/image";
import React from "react";
import { FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { HiOutlineShieldCheck } from "react-icons/hi2";

const Footer: React.FC = () => {
  return (
    <div className="min-w-full px-8 sm:px-12 md:px-8 xl:px-48 bg-google-black text-white capitalize">
      <div className="w-full relative gap-8 py-2 flex flex-col sm:flex-row justify-center items-start ">
        <div className="w-full md:w-auto flex items-center justify-start px-10">
          <div className="relative">
            <Image
              src="/assets/GDG-logo.svg"
              alt="logo"
              width={200}
              height={50}
              style={{ width: 'auto', height: 'auto' }}
            />
            <span className="text-google-lightGrey font-sora text-lg absolute -right-4 -top-2">
              &copy;
            </span>
          </div>
        </div>
        <div className="max-w-[400px] w-full flex justify-around items-center md:justify-center md:gap-12">
          <div>
            <h1 className="text-xl font-light font-sora mb-4 uppercase">
              Socials
            </h1>
            <div className="flex items-center mb-2 font-noto-sans">
              <FaLinkedin className="mr-2" />
              <span>Linkedin</span>
            </div>
            <div className="flex items-center mb-2">
              <FaInstagram className="mr-2" />
              <span>Instagram</span>
            </div>
            <div className="flex items-center">
              <FaXTwitter className="mr-2" />
              <span>X (Twitter)</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-light uppercase mb-4 font-sora">
              Navigate
            </h1>
            <div className="flex flex-col space-y-2 font-noto-sans">
              <span>about us</span>
              <span>events</span>
              <span>Our Team</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-2 items-center justify-center my-4">
        <HiOutlineShieldCheck />
        <span>MADE BY GDG-USAR TEAM WEBDEV</span>
      </div>
    </div>
  );
};

export default Footer;
