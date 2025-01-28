"use client";

import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

const AboutUs = () => {
  
  const imageRefs = useRef([]);
  const frameRefs = useRef([]);

  const handleMouseEnter = (index) => {
   
    gsap.killTweensOf(imageRefs.current[index]);
    gsap.killTweensOf(frameRefs.current[index]);

    
    if (frameRefs.current[index]) {
      gsap.to(frameRefs.current[index], {
        scale: 1.1, 
      });
    }

    if (imageRefs.current[index]) {
      gsap.to(imageRefs.current[index], {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power1.out",
      });
    }
  };

  const handleMouseLeave = (index) => {

    gsap.killTweensOf(imageRefs.current[index]);
    gsap.killTweensOf(frameRefs.current[index]);

    if (imageRefs.current[index]) {
      gsap.to(imageRefs.current[index], {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power1.in",
      });
    }

    if (frameRefs.current[index]) {
      gsap.to(frameRefs.current[index], {
        scale: 1,
        rotation: 0, 
        duration: 0.5,
        ease: "power1.in",
      });
    }
  };

  const items = [
    { text: "Learn", image: "/assets/illustrations/bulb.svg" },
    { text: "Connect", image: "/assets/illustrations/hashtag.png" },
    { text: "Grow", image: "/assets/illustrations/arrow.svg" },
  ];

  return (
    <div className="relative w-full min-h-screen">
      {/* About Us Heading with Down Arrow */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-10">
        <div className="flex items-center justify-center space-x-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white">ABOUT US</h2>
          <Image
            src="/assets/svgs/down_arrow.svg"
            alt="Down Arrow"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full h-full pt-32 md:pt-40 pb-10 flex flex-col items-start justify-center space-y-10 md:space-y-16 px-6 sm:px-12 md:px-32 lg:px-40">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-[75px] w-full md:w-auto ml-0 sm:ml-8 md:ml-16 lg:ml-24"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className="flex flex-col items-center md:items-start justify-center order-2 md:order-1">
              <div className="flex items-center justify-center space-x-4 mb-5">
                <Image
                  src="/assets/svgs/Exclude.svg"
                  alt="miniframe"
                  width={20}
                  height={20}
                  className="w-6 h-6 md:w-8 md:h-8"
                />
                <p className="font-noto-sans text-[#D2E3F3] font-bold text-2xl md:text-4xl uppercase">
                  {item.text}
                </p>
              </div>
              <Image
                src="/assets/svgs/Line 1.svg"
                alt="line"
                height={10}
                width={200}
                className="w-[200px] md:w-[300px]"
              />
            </div>

            {/* Image Container */}
            <div
              ref={(el) => (imageRefs.current[index] = el)}
              style={{
                opacity: 0,
                transform: "scale(0.8)",
              }}
              className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] order-1 md:order-2"
            >
              {/* Single Color Glow Effect */}
              <div 
                className="absolute inset-2 rounded-2xl z-[-2]"
                style={{
                  background: 'radial-gradient(circle at center, rgba(251, 188, 4, 0.7) 0%, rgba(251, 188, 4, 0.3) 50%, rgba(251, 188, 4, 0) 70%)',
                  filter: 'blur(15px)',
                  transform: 'scale(1.2)',
                }}
              ></div>

              <Image
                src="/assets/svgs/customFrame.svg"
                alt="frame"
                fill
                ref={(el) => (frameRefs.current[index] = el)}
                className="absolute top-0 left-0 z-10"
              />
              <Image
                src={item.image}
                alt={item.text}
                width={80}
                height={80}
                className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] z-20 object-contain md:w-[112px] md:h-[112px] w-[80px] h-[80px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;