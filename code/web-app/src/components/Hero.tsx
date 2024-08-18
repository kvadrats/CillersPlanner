"use client";
import { useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";

interface HeroProps {
  onClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onClick }) => {
  useEffect(() => {
    const myText = new SplitType("#h1-text", { types: "chars" });

    gsap.fromTo(
      ".char",
      { y: 115 },
      {
        y: 0,
        stagger: 0.05,
        delay: 0.2,
        duration: 0.5,
        ease: "power1.out",
      }
    );
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-custom-gradient">
      <div className="">
        <h1 id="h1-text">SCHEDULR.</h1>
        <p className="mb-10 mt-1">
          Your AI Scheduling Friend - Simplifying Management
        </p>
        <button
          onClick={onClick}
          className=" py-2 px-6 border rounded-lg hover:bg-white hover:text-black transition duration-150 ease-out hover:ease-in tracking-wide"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;

export {};
