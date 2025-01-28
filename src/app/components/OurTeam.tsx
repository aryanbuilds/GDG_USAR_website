import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import client from "../../utils/sanityClient";
import { urlFor } from "../../utils/sanityClient";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurTeam: React.FC = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const frames = sectionRef.current.querySelectorAll(".frame");

    gsap.fromTo(
      frames,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  return (
    <div ref={sectionRef} className="container mx-auto px-12">
      <div className="w-full ml-4 md:ml-0 flex justify-center items-center mb-8">
        <h2 className="text-3xl md:text-5xl font-sora mb-8 text-center uppercase text-white bg-gradient-to-r from-google-lightBlue to-google-lightYellow bg-clip-text text-transparent" style={{ textShadow: '0 0 3px rgba(150, 150, 150, 0.8), 0 0 5px rgba(150, 150, 150, 0.6), 0 0 1px rgba(150, 150, 150, 0.4)'}}>
          Our Team
        </h2>
        <Image 
        src={'/assets/svgs/arrow.svg'}
        width={80}
        height={80}
        alt="arrow"
        className="w-28 md:w-20 animate-pulse"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8 lg:gap-y-0">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className={`relative w-full frame ${
              index % 3 === 0 ? "lg:mt-0" : index % 3 === 1 ? "lg:mt-20" : "lg:mt-40"
            }`}
          >
            <div>
              <div
                className={`absolute w-[300px] h-[300px] inset-0 ${
                  index < 3
                    ? "bg-google-red"
                    : index < 6
                    ? "bg-google-yellow"
                    : "bg-google-green"
                } blur-3xl opacity-50 brightness-75 -z-20`}
              ></div>
              <Image
                src={"/assets/svgs/frame-square.svg"}
                alt={index.toString()}
                width={240}
                height={240}
                className="w-full z-10"
              />
              <Image
                src={"/assets/svgs/image1.png"}
                alt={index.toString()}
                width={200}
                height={200}
                className="w-full p-9 md:p-7 lg:p-9 absolute inset-0 object-cover rounded-lg -z-10"
              />
            </div>
            <div className="py-4 flex justify-around items-center ">
              <h3 className="text-2xl font-sora font-bold text-white">
                Text {index}
              </h3>
              <p className="text-lg font-sora text-white">name of {index}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center items-center my-16 gap-4">
        <div className="text-center space-y-2 bg-gradient-to-r from-google-lightBlue to-google-lightRed bg-clip-text text-transparent" style={{ textShadow: '0 0 3px rgba(150, 150, 150, 0.8), 0 0 5px rgba(150, 150, 150, 0.6), 0 0 1px rgba(150, 150, 150, 0.4)'}}>

        <p className="capitalize text-white font-sora text-3xl md:text-4xl font-medium underline text-transparent">meet the</p>
        <p className="capitalize text-white font-sora text-3xl md:text-4xl font-medium underline text-transparent"> whole team</p>
        </div>
        <Image 
        src={'/assets/svgs/arrow.svg'}
        width={80}
        height={80}
        alt="arrow"
        className="p-0 md:mb-8 ml-2 w-20 md:w-20 animate-bounce-slow "
        style={{ animationDuration: '2s', rotate: '-90deg'}}
        />
      </div>
    </div>
  );
};

export default OurTeam;
