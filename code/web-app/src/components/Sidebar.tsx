import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { NavLink } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Sidebar: React.FC = () => {
  const logoRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const myText = new SplitType("#logo", { types: "chars" });

    gsap.fromTo(
      ".char",
      { y: 115 },
      {
        y: 0,
        stagger: 0.05,
        delay: 0.2,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top 85%", // When the top of the logo hits 80% of the viewport height
          end: "top 70%", // When the top of the logo hits 50% of the viewport height
          toggleActions: "play none none none", // Only play the animation once
        },
      }
    );
  }, []);
  return (
    <div className="w-64 h-screen flex flex-col  justify-center">
      <div className="h-[90%]  ml-7  bg-[#1c6b59] text-white rounded-2xl">
        <div className="w-full ">
          <div className="flex items-center justify-center h-20 border-thin border-gray-200 mx-4 ">
            <h1 id="logo" ref={logoRef} className="text-2xl font-semibold">
              SCHEDULR.
            </h1>
          </div>
        </div>
        <div className=" flex flex-col items-center pt-40">
          <ul className="flex flex-col mt-4 space-y-2 tracking-wider">
            <li className="opacity-80 px-4 py-2 hover:opacity-100 transition duration-300 hover:scale-110">
              <NavLink
                to="/employees"
                className={({ isActive }) =>
                  `flex items-center text-lg text-white ${
                    isActive ? "opacity-100" : ""
                  }`
                }
              >
                Employees
              </NavLink>
            </li>
            <li className="px-4 py-2 opacity-80 hover:opacity-100 hover:scale-110 transition duration-300">
              <NavLink
                to="/schedule"
                className={({ isActive }) =>
                  `flex items-center text-lg text-white ${
                    isActive ? "opacity-100" : ""
                  }`
                }
              >
                Schedule
              </NavLink>
            </li>
            <li className="px-4 py-2 opacity-80 hover:opacity-100 hover:scale-110 transition duration-300">
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  `flex items-center text-lg text-white ${
                    isActive ? "opacity-100" : ""
                  }`
                }
              >
                Chat
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
