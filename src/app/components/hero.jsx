import React from "react";
import Image from "next/image";
import Scene from "./Scene";
import Head from "next/head";

const Hero = () => {
  return (
    <>
      <div className="relative flex items-center justify-center w-full h-screen overflow-hidden">
        {/* Tunnel SVG with proper responsiveness */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="/assets/svgs/Tunnel.svg"
              alt="Tunnel"
              priority={true}
              loading="eager"
              fetchPriority="high"
              fill={true}
              sizes="100vw"
              quality={90}
              className="object-cover"
            />
          </div>
        </div>

        {/* 3D Scene - Load after main content */}
        <div className="absolute inset-0 z-0">
          <Scene priority={false} />
        </div>

        {/* GDG-USAR Text - Optimized for LCP */}
        <div className="absolute bottom-1/4 z-10 text-center w-full">
          <h1
            className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl"
            style={{
              fontDisplay: "swap",
              textRendering: "optimizeLegibility",
            }}
          >
            GDG USAR
          </h1>
        </div>
      </div>
    </>
  );
};

export default Hero;
