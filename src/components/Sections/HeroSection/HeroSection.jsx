import { NavLink } from "react-router-dom";
import heroImg from "../../../assets/img/hero/hero.webp";

const HeroSection = () => {
  return (
    <section className="relative w-screen -ml-[50vw] left-[50%]">
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover "
        style={{ backgroundImage: `url(${heroImg})` }}
      ></div>
      <div className="relative container mx-auto px-5 py-10 flex flex-col items-center">
        <h1
          className=" text-5xl font-bold text-white text-center max-w-80 wrap-break-words pb-4"
          style={{
            WebkitTextStroke: "0.2px black",
          }}
        >
          From To-Do to Done!
        </h1>
        <div className="w-full h-0.5 bg-white "></div>
        <div className="relative w-screen -ml-[82vw] left-[50%] flex flex-col items-start px-5 pt-12 pb-40">
          <p className="text-left text-xl tracking-wider font-bold max-w-[220px] pt-12 pb-16 ">
            Track, plan, and complete tasks effortlessly. Task Flow helps you
            turn your ideas into action.
          </p>
          <NavLink
            to="/contact"
            className="flex items-center gap-5 w-40 h-10 font-normal text-[14px] rounded-xl px-5 text-white bg-blue-600 shadow-[5px_10px_30px_rgba(76,64,247,0.5)]"
          >
            Get started
            <svg className="w-4 h-3 stroke-[6px]">
              <use href="/sprite.svg#icon-Arrow-Right" />
            </svg>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
