import React, { useEffect, useState, memo } from "react";
import { NavLink } from "react-router-dom";
import PadLayout from "../Layout/PadLayout";

const HeroSection: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section bg-no-repeat bg-center bg-cover relative overflow-hidden min-h-screen flex flex-col justify-center">
      <PadLayout
        padding={["m", "s", "m", "s"]}
        className="max-w-7xl mx-auto w-full"
      >
        <div className="flex flex-col items-center pt-10 lg:pt-24">
          <h1
            className="flex flex-col items-center gap-2 lg:gap-4 font-[1000] text-center mx-auto leading-[0.8] tracking-[-0.07em] uppercase "
            style={{
              fontSize: "clamp(2.5rem, 10vw, 7rem)",
            }}
          >
            <span className="block text-neutral-800 drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
              From To-Do
            </span>

            <span
              className={`block transition-all duration-1000 ease-out drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] ${
                animate
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-12 scale-90"
              } bg-linear-to-r from-blue-900 to-indigo-950 bg-clip-text text-transparent`}
            >
              to Done!
            </span>
          </h1>
        </div>

        <div className="lg:ml-14 w-3/4 h-1 bg-neutral-800 mt-12 mb-10 lg:mt-20 lg:mb-24 rounded-full"></div>

        <div className="flex flex-col items-start gap-12 lg:gap-32 pb-10">
          <p className="text-left text-2xl text-black tracking-tight font-extrabold max-w-md md:text-4xl lg:text-5xl lg:max-w-2xl leading-[1.1]">
            Track, plan, and complete tasks
            <span className="text-blue-900 italic pl-">effortlessly</span>. Task
            Flow helps you turn your ideas into action.
          </p>

          <NavLink
            to="/register"
            className="group flex items-center justify-center gap-5 w-fit px-12 py-6 font-black text-xl rounded-2xl text-white bg-blue-900 hover:bg-black shadow-[0_20px_40px_rgba(30,58,138,0.4)] transition-all hover:-translate-y-2 active:scale-95"
          >
            Get started
            <svg
              className="w-7 h-7 transition-transform group-hover:translate-x-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ strokeWidth: 4 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </NavLink>
        </div>
      </PadLayout>
    </section>
  );
};

export default memo(HeroSection);
