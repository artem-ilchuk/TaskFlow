import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PadLayout from "../Layout/PadLayout";

const HeroSection: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section w-screen bg-no-repeat bg-center bg-cover">
      <PadLayout padding={["m", "s", "m", "s"]} className="mx-auto">
        <div className="flex flex-col items-center">
          <h1
            className="text-5xl font-bold text-white text-center mx-auto max-w-xl wrap-break-word pb-4"
            style={{
              WebkitTextStroke: "0.2px black",
            }}
          >
            <span>From To-Do</span>
            <br />
            <span
              className={`inline-block transition duration-700 ease-out ${
                animate
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              to Done!
            </span>
          </h1>
        </div>
        <div className="w-full h-0.5 bg-white"></div>
        <div className="pt-12 pb-40">
          <p className="text-left text-xl text-black tracking-wider font-bold max-w-[220px] pt-20 pb-16 md:text-3xl md:max-w-[420px] lg:text-4xl lg:max-w-[500px]">
            Track, plan, and complete tasks effortlessly. Task Flow helps you
            turn your ideas into action.
          </p>
          <NavLink
            to="/register"
            className="flex items-center gap-5 w-40 h-10 font-normal text-[14px] rounded-xl px-5 text-white bg-blue-600 shadow-[5px_10px_30px_rgba(76,64,247,0.5)]"
          >
            Get started
            <svg className="w-4 h-3" style={{ strokeWidth: 6 }}>
              <use href="/sprite.svg#icon-Arrow-Right" />
            </svg>
          </NavLink>
        </div>
      </PadLayout>
    </section>
  );
};

export default HeroSection;
