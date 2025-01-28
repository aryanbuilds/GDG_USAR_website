"use client";

import { useEffect, useRef} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const crossData = [
  { ref: "cross1Ref", direction: -75, scrub: 1, duration: 1 },
  { ref: "cross2Ref", direction: -150, scrub: 2, duration: 3 },
  { ref: "cross3Ref", direction: -100, scrub: 1, duration: 4 },
  { ref: "cross4Ref", direction: -120, scrub: 2, duration: 2 },
];

const Parallax = () => {

    const crossRefs = {
        cross1Ref: useRef(null),
        cross2Ref: useRef(null),
        cross3Ref: useRef(null),
        cross4Ref: useRef(null),
    };

    const body1Ref = useRef(null);
    
    useEffect(() => {

        const body1 = body1Ref.current;

        crossData.forEach(({ ref, direction, scrub, duration }) => {
        const crossElement = crossRefs[ref].current;

        if (crossElement && body1) {
            gsap.to(crossElement, {
            transform: "translateX(-10%)",
            scrollTrigger: {
                trigger: body1,
                start: "top bottom",
                end: "top -100%",
                ease: "power1.out",
                scrub,
                onUpdate: (self) => {
                gsap.to(crossElement, {
                    x: `${direction * self.progress}vw`,
                    duration,
                });
                },
            },
            });
        }
        });
    }, [crossRefs, body1Ref]);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center overflow-hidden py-10 select-none">
            <div className="w-full h-10"/>
            <div
                ref={body1Ref}
                className="w-full h-full flex flex-col items-start justify-center py-10 space-y-5 rotate-12"
            >
                {crossData.map(({ ref }, index) => (
                <div
                    key={index}
                    ref={crossRefs[ref]}
                    className={`w-[250vw] h-auto -left-[50vw] `}
                >
                    <Image
                    src="/assets/svgs/crossstraight.svg"
                    alt="parallax cross"
                    width={3834}
                    height={1024}
                    />
                </div>
                ))}
            </div>
            {/* <div className="w-full h-[300px]"/> */}
        </div>
  );
};

export default Parallax;