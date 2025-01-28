"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';

const ScrambleText = () => {
  const textRefs = useRef([]);
  const containerRef = useRef(null);
  const [isAlternateSet, setIsAlternateSet] = useState(false);
  const [displayTexts, setDisplayTexts] = useState([
    "CODE CRAFT", "TECH PULSE", "BUILD NEXT", "AI FUTURE",
    "DEV SPARK", "INNOVATE", "CLOUD PRO", "QUANTUM",
    "DATA FLOW", "APP FORGE", "FULL STACK", "ML VISION",
    "CYBER OPS", "DEV TOOLS", "CODE LIFE", "LEVEL UP"
  ]);

  const alternateTexts = useMemo(() => [
    "NEXT WAVE", "THINK BIG", "START NOW", "GO BEYOND",
    "TECH EDGE", "CODE ART", "WEB THREE", "INSPIRE",
    "API CRAFT", "APP MAKER", "DEV GURU", "AI MASTER",
    "SEC MIND", "SYS ARCH", "LIVE CODE", "EVOLVE"
  ], []);

  const defaultTexts = useMemo(() => [
    "CODE CRAFT", "TECH PULSE", "BUILD NEXT", "AI FUTURE",
    "DEV SPARK", "INNOVATE", "CLOUD PRO", "QUANTUM",
    "DATA FLOW", "APP FORGE", "FULL STACK", "ML VISION",
    "CYBER OPS", "DEV TOOLS", "CODE LIFE", "LEVEL UP"
  ], []);

  const validateText = (text) => {
    return typeof text === 'string' && 
           text.length <= 10 && 
           text.length >= 2 && 
           /^[A-Z0-9\s]*$/.test(text);
  };

  const validateTextArray = useMemo(() => (texts) => {
    return Array.isArray(texts) && 
           texts.length === 16 && 
           texts.every(validateText);
  }, []);

  useEffect(() => {
    const chars = "!<>-_\\/[]{}—=+*^?#________{}@@#}@";
    let activeIndices = new Set();
    let isTransitioning = false;
    let timeline;

    const createGlowEffect = (element) => {
      return gsap.timeline()
        .to(element, {
          duration: 0.2,
          textShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)",
          color: "white",
          ease: "power2.inOut"
        })
        .to(element, {
          duration: 0.3,
          textShadow: "none",
          color: "rgba(255, 255, 255, 0.8)",
          ease: "power2.out"
        });
    };

    const scrambleText = (element, targetText, isTransition = false) => {
      return new Promise((resolve) => {
        const duration = isTransition ? 0.6 : 1.2;
        const steps = Math.floor(duration * 60); // 60fps
        let frame = 0;

        const tl = gsap.timeline({
          onComplete: () => {
            element.innerText = targetText;
            if (!isTransition) createGlowEffect(element);
            resolve();
          }
        });

        if (!isTransition) {
          tl.to(element, {
            duration: 0.15,
            scale: 1.05,
            ease: "power2.out"
          });
        }

        tl.to({}, {
          duration: duration,
          onUpdate: function() {
            frame = Math.floor(this.progress() * steps);
            let newText = "";
            const progressIndex = Math.floor(this.progress() * targetText.length);
            
            for(let i = 0; i < targetText.length; i++) {
              if (i < progressIndex) {
                newText += targetText[i];
              } else if (i === progressIndex) {
                const randomChar = chars[Math.floor((Date.now() / 30 + i) % chars.length)];
                newText += randomChar;
              } else {
                const randomChar = chars[Math.floor((Date.now() / 50 + i * frame) % chars.length)];
                newText += Math.random() > 0.7 ? randomChar : (element.innerText[i] || randomChar);
              }
            }
            element.innerText = newText;
          },
          ease: "power1.inOut"
        });

        if (!isTransition) {
          tl.to(element, {
            duration: 0.15,
            scale: 1,
            ease: "power2.in"
          }, "-=0.15");
        }
      });
    };

    const getNextIndex = () => {
      if (activeIndices.size >= 1 || isTransitioning) return undefined;

      const columns = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15]
      ];
      
      const availableColumns = columns.filter(col => 
        !col.some(idx => activeIndices.has(idx))
      );
      
      if (availableColumns.length > 0) {
        const randomColumn = availableColumns[Math.floor(Math.random() * availableColumns.length)];
        return randomColumn[Math.floor(Math.random() * randomColumn.length)];
      }
      
      activeIndices.clear();
      return Math.floor(Math.random() * displayTexts.length);
    };

    const switchTexts = async () => {
      if (isTransitioning) return;
      isTransitioning = true;
      
      try {
        // Reset any active animations
        activeIndices.clear();
        
        const nextTexts = isAlternateSet ? defaultTexts : alternateTexts;
        
        if (!validateTextArray(nextTexts)) {
          console.error('Invalid text format detected');
          isTransitioning = false;
          return;
        }

        const promises = textRefs.current.map((element, idx) => {
          return scrambleText(element, nextTexts[idx], true);
        });
        
        await Promise.all(promises);
        
        setDisplayTexts(nextTexts);
        setIsAlternateSet(!isAlternateSet);
      } catch (error) {
        console.error('Switch texts error:', error);
      } finally {
        isTransitioning = false;
      }
    };

    const startRandomScramble = async () => {
      const idx = getNextIndex();
      if (idx === undefined) return;

      activeIndices.add(idx);
      const element = textRefs.current[idx];
      const targetText = displayTexts[idx];

      if (element) {
        try {
          await scrambleText(element, targetText);
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (error) {
          console.error('Animation error:', error);
        } finally {
          activeIndices.delete(idx);
        }
      }
    };

    const initialDelay = setTimeout(() => {
      startRandomScramble();
    }, 500);
    
    const scrambleInterval = setInterval(() => {
      startRandomScramble();
    }, 2000);

    const switchInterval = setInterval(() => {
      switchTexts();
    }, 15000);

    const handleHover = (element, isEnter) => {
      if (!activeIndices.has(element) && !isTransitioning) {
        gsap.to(textRefs.current[element], {
          duration: 0.3,
          textShadow: isEnter ? "0 0 10px rgba(255, 255, 255, 0.4)" : "none",
          scale: isEnter ? 1.05 : 1,
          color: isEnter ? "white" : "rgba(255, 255, 255, 0.8)",
          ease: isEnter ? "power2.out" : "power2.in"
        });
      }
    };

    textRefs.current.forEach((element, idx) => {
      let hoverTimeout;
      element.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => handleHover(idx, true), 50);
      });

      element.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => handleHover(idx, false), 50);
      });
    });

    return () => {
      clearTimeout(initialDelay);
      clearInterval(scrambleInterval);
      clearInterval(switchInterval);
      gsap.killTweensOf({});
    };
  }, [displayTexts, alternateTexts, defaultTexts, validateTextArray]);

  return (
    <div className="w-full max-w-7xl mx-auto py-4 sm:py-8 md:py-12" ref={containerRef}>
      {/* Top Boxes */}
      <div className="container mx-auto px-4 sm:px-6 mb-6 sm:mb-8 md:mb-12">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          {/* Square */}
          <div className="w-full sm:w-48 md:w-56 lg:w-64 aspect-square bg-black/10 rounded-lg border border-white/10 backdrop-blur-sm"></div>
          {/* Rectangle */}
          <div className="w-full h-48 sm:h-48 md:h-56 lg:h-64 sm:flex-1 max-w-2xl bg-black/10 rounded-lg border border-white/10 backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Matrix Text Grid */}
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-4 pointer-events-none">
          <div className="border-r border-white/10"></div>
          <div className="border-r border-white/10"></div>
          <div className="hidden sm:block border-r border-white/10"></div>
        </div>

        <div className="absolute inset-0 grid grid-rows-8 sm:grid-rows-4 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border-b border-white/10"></div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 max-w-5xl mx-auto">
          {displayTexts.map((text, index) => (
            <div 
              key={index}
              className="p-3 sm:p-4 md:p-6 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex items-center justify-center"
            >
              <div
                ref={(el) => (textRefs.current[index] = el)}
                className="text-sm sm:text-base md:text-lg font-mono text-white/80 hover:text-white text-center transition-colors duration-300 cursor-pointer select-none"
              >
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Boxes */}
      <div className="container mx-auto px-4 sm:px-6 mt-6 sm:mt-8 md:mt-12">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          {/* Rectangle First */}
          <div className="w-full h-48 sm:h-48 md:h-56 lg:h-64 sm:flex-1 max-w-2xl bg-black/10 rounded-lg border border-white/10 backdrop-blur-sm"></div>
          {/* Square Second */}
          <div className="w-full sm:w-48 md:w-56 lg:w-64 aspect-square bg-black/10 rounded-lg border border-white/10 backdrop-blur-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default ScrambleText;