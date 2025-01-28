'use client';
import Image from "next/image";
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WE_TEXT_IMAGES } from "../../utils/constants";

gsap.registerPlugin(ScrollTrigger);

const WeTextSection: React.FC = () => {
  // Image hover 
  const Images = [...WE_TEXT_IMAGES];
  // Refs for circle and underline
  const circleRef = useRef();
  const underlineRef = useRef();
  const frameRef = useRef();
  const hoverTimeoutRef = useRef(null);
  const resetTimeoutRef = useRef(null);
  // Active text and image on hover
  const [activeText, setActiveText] = useState<HTMLElement | null>(null);
  const [activeImage, setActiveImage] = useState(Images[0].image);
  const [isHovered, setIsHovered] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut", duration: 0.8 } });
    tl.to(circleRef.current, {
      x: activeText ? activeText.offsetLeft - 16 : 0,
      y: activeText ? activeText.offsetTop - 36 : 0,
    })
    .to(underlineRef.current, {
      width: activeText ? activeText.offsetWidth : 0,
      top: activeText ? activeText.offsetTop + activeText.offsetHeight - 16 : 0,
    }, "<")
    .to(frameRef.current, { 
      rotate: activeText ? (Number((activeText as HTMLElement).dataset.index) % 2 === 0 ? 90 : 0) : 0,
    }, "<");

    return () => {
      tl.kill();
    };
  }, [activeText, isPortrait]);

  const handleTextMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    clearTimeout(resetTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      const target = e.target as HTMLElement;
      setActiveText(target);
      setActiveImage(Images[Number(target.dataset.index) - 1].image);
      setIsHovered(true);
      setIsPortrait(prev => !prev);
    }, 100);
  };

  const handleTextMouseOut = () => {
    clearTimeout(hoverTimeoutRef.current);
    resetTimeoutRef.current = setTimeout(() => {
      setActiveText(null);
      setIsHovered(false);
      setIsPortrait(prev => !prev);
    }, 700);
  };

  return (
    <div className=" gap-20 md:gap-24 lg:gap-36 w-full h-screen flex flex-col md:flex-row md:px-8 justify-center items-center mx-auto ">
      <div className="peer relative uppercase space-y-4 py-6 text-google-grey font-sora text-4xl pl-4 border-l-4">
        <div ref={circleRef} className="absolute -left-[12px] top-12 w-5 h-5 rounded-full bg-google-lightGrey bg-opacity-85"></div>
        <div ref={underlineRef} className="absolute top-16 w-full left-4 h-1 bg-google-lightGrey transition-all duration-400 ease-out"></div>
        {Images.map((item) => (
            <div
            key={item.index}
            onMouseOver={handleTextMouseOver}
            onMouseOut={handleTextMouseOut}
            data-index={item.index}
            className={`${activeText?.dataset?.index === String(item.index) ? 'text-google-lightGrey' : ''} transition-all duration-300`}
            // the Text shadow glow effect
            style={{ textShadow: activeText?.dataset?.index === String(item.index) ? '0 0 3px rgba(150, 150, 150, 0.8), 0 0 5px rgba(150, 150, 150, 0.6), 0 0 1px rgba(150, 150, 150, 0.4)' : 'none' }}
            >
            {item.text}
            </div>
        ))}
      </div>
      <div className="relative">
        <div className={`w-40 h-40 grid-image bg-google-lightGrey rounded-full blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-50' : 'opacity-0'}`}></div>
        <Image ref={frameRef} className={`rotate-1 drop-shadow-[5px_1px_5px_rgba(100,100,100,0.5)]`} src={'/assets/svgs/frame.svg'} width={400} height={400} alt="frame" />
        <Image
          className={`w-40 grid-image hover:scale-item transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          src={activeImage}
          alt={activeImage}
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default WeTextSection;
