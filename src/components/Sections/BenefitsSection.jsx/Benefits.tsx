import React, { memo } from "react";
import BenefitsCard from "./BenefitsCards/BenefitsCard";
import BenefitsList from "./BenefitsList/BenefitsList";
import { benefitsData } from "../../../data/benefitsData";
import { benefitsDescription } from "../../../data/benefitsDescription";
import PadLayout from "../../Layout/PadLayout";

const Benefits: React.FC = () => {
  return (
    <section className="benefits bg-bg transition-colors duration-500">
      <PadLayout padding={["l", "s", "l", "s"]}>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-20 lg:gap-16 xl:gap-24 max-w-7xl mx-auto">
          <ul
            className="
            flex flex-col items-center 
            gap-10 
            lg:flex-wrap lg:flex-row lg:content-center
            lg:w-125 lg:h-auto 
            lg:gap-x-6 lg:gap-y-6
            xl:w-150 xl:gap-x-10 xl:gap-y-10
          "
          >
            {benefitsData.map((item) => (
              <li key={item.title} className="first:pt-0 lg:first:pt-14">
                <BenefitsCard {...item} />
              </li>
            ))}
          </ul>

          <div className="flex flex-col max-w-md lg:max-w-140 xl:max-w-160 gap-16">
            <h2
              className="
              font-[1000] mb-12 lg:mb-20
              text-3xl lg:text-5xl xl:text-6xl 
              leading-[0.8] uppercase tracking-[-0.07em]
              text-text flex flex-col gap-1
            "
            >
              <span className="block">Customer</span>

              <span className="block lg:ml-12 xl:ml-20 text-primary italic lowercase font-black tracking-normal leading-none">
                satisfaction
              </span>

              <span className="block lg:ml-24 xl:ml-40 underline decoration-4 decoration-primary/20 underline-offset-8">
                is priority
              </span>
            </h2>

            <div className="lg:pl-10 flex flex-col gap-12">
              <p
                className="
                text-text opacity-70 font-bold
                text-lg xl:text-2xl 
                leading-[1.3] tracking-tight max-w-md
              "
              >
                We serve a variety of users—from solo creators to global teams.
                Task Flow helps everyone manage tasks efficiently.
              </p>

              <ul className="flex flex-col gap-5 lg:gap-7">
                {benefitsDescription.map((item) => (
                  <li
                    key={item.text}
                    className="transition-transform hover:translate-x-2"
                  >
                    <BenefitsList {...item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PadLayout>
    </section>
  );
};

export default memo(Benefits);
