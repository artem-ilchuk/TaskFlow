import React, { memo } from "react";
import BenefitsCard from "./BenefitsCards/BenefitsCard";
import BenefitsList from "./BenefitsList/BenefitsList";
import { benefitsData } from "../../../data/benefitsData";
import { benefitsDescription } from "../../../data/benefitsDescription";
import PadLayout from "../../Layout/PadLayout";
import InlineLayout from "../../Layout/InlineLayout";

const Benefits: React.FC = () => {
  return (
    <section className="benefits">
      <PadLayout padding={["l", "s", "l", "s"]}>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-20 lg:gap-[53px] xl:gap-20">
          <ul
            className="
            flex flex-col items-center 
            gap-10 
            lg:flex-wrap lg:flex-row lg:content-center
            lg:w-[486px] lg:h-[553px] 
            lg:gap-x-[22px] lg:gap-y-[23.6px]
            xl:w-[580px] xl:h-[702px] 
            xl:gap-x-10 xl:gap-y-10
          "
          >
            {benefitsData.map((item) => (
              <li
                key={item.title}
                className="first:pt-0 lg:first:pt-[50.68px] xl:first:pt-14"
              >
                <BenefitsCard {...item} />
              </li>
            ))}
          </ul>

          <div className="max-w-md lg:max-w-[365px] xl:max-w-[460px]">
            <h2
              className="
              font-semibold mb-6 lg:mb-9
              text-xl lg:text-2xl xl:text-[56px] 
              leading-[140%] lg:leading-[133%] xl:leading-[129%]
              xl:tracking-[-0.01em]
            "
            >
              Customer satisfaction is our first priority
            </h2>

            <p
              className="
              text-(--links)] font-normal
              text-sm xl:text-18 
              leading-[171%] xl:leading-[178%]
            "
            >
              We serve a variety of users—from solo creators to global teams.
              Task Flow helps everyone manage tasks efficiently.
            </p>
            <ul className="flex flex-col gap-3 lg:gap-4 mt-6 lg:mt-9">
              {benefitsDescription.map((item) => (
                <li key={item.text}>
                  <BenefitsList {...item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PadLayout>
    </section>
  );
};

export default memo(Benefits);
