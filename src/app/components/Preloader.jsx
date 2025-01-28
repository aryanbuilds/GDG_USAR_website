'use client';
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const component = React.useRef(null);
  const logoRef = React.useRef(null);
  const ring1Ref = React.useRef(null);
  const ring2Ref = React.useRef(null);
  const ring3Ref = React.useRef(null);

  useEffect(() => {
    let timeoutId;
    const ctx = gsap.context(() => {
      // Start with everything visible but scaled
      gsap.set(component.current, { opacity: 0 });
      gsap.set(logoRef.current, { scale: 0.8, opacity: 1 });
      gsap.set([ring1Ref.current, ring2Ref.current, ring3Ref.current], { 
        scale: 0.9,
        opacity: 0.8,
        rotation: 0
      });

      // Immediate rotation animations
      const startRotations = () => {
        // Logo wiggle
        gsap.to(logoRef.current, {
          rotation: "+=6",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        // Rotating rings
        gsap.to(ring1Ref.current, {
          rotation: 360,
          duration: 6,
          repeat: -1,
          ease: "none"
        });

        gsap.to(ring2Ref.current, {
          rotation: -360,
          duration: 8,
          repeat: -1,
          ease: "none"
        });

        gsap.to(ring3Ref.current, {
          rotation: 360,
          duration: 10,
          repeat: -1,
          ease: "none"
        });
      };

      // Start rotations immediately
      startRotations();

      // Fade in the entire component
      gsap.to(component.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          // Subtle scale animation for everything
          gsap.to(logoRef.current, {
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
          });
          gsap.to([ring1Ref.current, ring2Ref.current, ring3Ref.current], {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.2)"
          });
        }
      });

      // Set minimum display time
      timeoutId = setTimeout(() => {
        const exitTl = gsap.timeline({
          onComplete: () => {
            setIsLoading(false);
            document.body.style.overflow = 'visible';
          }
        });

        exitTl.to([ring3Ref.current, ring2Ref.current, ring1Ref.current], {
          scale: 1.2,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.in(1.7)"
        })
        .to(logoRef.current, {
          scale: 0,
          duration: 0.5,
          ease: "back.in(2)"
        }, "-=0.3")
        .to(component.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut"
        }, "-=0.3");
      }, 2000); // Reduced to 2 seconds for better UX
    });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      ctx.revert();
      document.body.style.overflow = 'visible';
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div ref={component} className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414]">
      <div className="relative">
        {/* Rotating rings */}
        <div ref={ring1Ref} className="absolute inset-0 w-40 h-40 border-4 border-[#4285F4] rounded-full" style={{ transform: 'translate(-16px, -16px)' }} />
        <div ref={ring2Ref} className="absolute inset-0 w-48 h-48 border-4 border-[#DB4437] rounded-full" style={{ transform: 'translate(-32px, -32px)' }} />
        <div ref={ring3Ref} className="absolute inset-0 w-56 h-56 border-4 border-[#F4B400] rounded-full" style={{ transform: 'translate(-48px, -48px)' }} />
        
        {/* GDG Logo */}
        <div ref={logoRef} className="relative w-32 h-32">
          <Image
            src="/assets/GDG-logo.svg"
            alt="GDG Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;