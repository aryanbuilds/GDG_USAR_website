"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { twMerge } from "tailwind-merge";

gsap.registerPlugin(ScrollTrigger);

const Belt = ({className = ''}) => {
  const beltRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (beltRef.current && bodyRef.current) {
      gsap.to(beltRef.current, {
        transform: "translateX(-10%)",
        scrollTrigger: {
          trigger: bodyRef.current,
          start: "top bottom",
          end: "top -100%",
          ease: "power1.out",
          scrub: 1,
          onUpdate: (self) => {
            gsap.to(beltRef.current, {
              x: `${-100 * self.progress}vw`,
              duration: 2,
            });
          },
        },
      });
    }
  }, []);

  return (
    <div
      ref={bodyRef}
      className={twMerge("w-full h-full overflow-hidden py-8 mb-24", className)} // Increased height
    >
      <div 
      className="w-[250vw] h-auto -left-[50vw]"
      ref={beltRef}>
        <Image
          src="/assets/svgs/belt.svg"
          alt="belt"
          width={6000} // Increased width for a larger belt
          height={6000} // Increased height for a larger belt
          className="scale-[1.2]" // Optional scaling for a more dramatic effect
        />
      </div>
    </div>
  );
};

export default Belt;
