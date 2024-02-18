import Image from "next/image";
import { Intruction, InstructionDots } from "@/components/instruction";
import { SubButton } from "@/components/button/button";
import React, { useState, useEffect, useRef } from "react";
import dSiphon from "@/public/imgs/3dSiphon.png";
import siphon from "@/public/imgs/siphonInt.png";
import bench from "@/public/imgs/bench.png";
import chair from "@/public/imgs/chair.png";
import front from "@/public/imgs/front.png";
import shelf from "@/public/imgs/shelf.png";

export default function Home() {
  const instructionItem = [
    {
      image: siphon,
      alt: "bar or siphons",
      title: "Filter",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      image: front,
      alt: "cafe front",
      title: "Water",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      image: chair,
      alt: "cafe interior",
      title: "Boil",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      image: shelf,
      alt: "bar or siphons",
      title: "Coffee",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      image: bench,
      alt: "front of cafe",
      title: "Enjoy",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];
  const nextSectionRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (nextSectionRef.current) {
      window.scrollTo({
        top: nextSectionRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const hasBanner = true; // Set this to true if you have a banner, false otherwise
  const totalItemsWithoutBanner = instructionItem.length;
  const totalItemsWithBanner = hasBanner
    ? totalItemsWithoutBanner + 1
    : totalItemsWithoutBanner;

  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotScroll = () => {
    const section = nextSectionRef.current;
    if (section) {
      const scrollPosition = window.scrollY;
      let itemIndex = 0;

      // Find the index of the section currently in view
      for (let i = 0; i < totalItemsWithBanner; i++) {
        const currentSection = nextSectionRef.current.children[
          i
        ] as HTMLElement;

        // Check if currentSection is defined before accessing its properties
        if (
          currentSection &&
          currentSection.offsetTop <= scrollPosition &&
          currentSection.offsetTop + currentSection.clientHeight >
            scrollPosition
        ) {
          itemIndex = i;
          break;
        }
      }

      setActiveIndex(itemIndex);
    }
  };

  // Attach the scroll event listener
  React.useEffect(() => {
    window.addEventListener("scroll", handleDotScroll);
    return () => {
      window.removeEventListener("scroll", handleDotScroll);
    };
  }, []);
  return (
    <div>
      <div className="relative">
        <Image
          src={dSiphon}
          alt="Outer Image"
          className="h-screen object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white">
          <div
            onClick={handleScroll}
            className="absolute max-w-[80vw] lg:max-w-[25vw] text-white leading-none text-center"
          >
            <h1 className="pb-[2vh]">Learn the art of siphon brewing</h1>
            <SubButton
              text="BEGIN YOUR JOURNEY"
              colour="hover:bg-brown"
              textColour="text-white"
            />
          </div>
        </div>
      </div>
      <div ref={nextSectionRef}>
        {instructionItem.map((item, index) => (
          <Intruction
            key={index}
            order={index + 1}
            image={item.image}
            alt={item.alt}
            title={item.title}
            text={item.text}
          />
        ))}
      </div>
      <InstructionDots
        totalItems={totalItemsWithBanner}
        activeIndex={activeIndex}
      />
    </div>
  );
}
