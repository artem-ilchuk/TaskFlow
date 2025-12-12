import BenefitsCard from "./BenefitsCards/BenefitsCard";
import BenefitsList from "./BenefitsList/BenefitsList";
import { benefitsData } from "../../../data/benefitsData";
import { benefitsDescription } from "../../../data/benefitsDescription";
import PadLayout from "../../Layout/PadLayout";
import CenterLayout from "../../Layout/CenterLayout";
import { Columns, Column } from "../../Layout/ColomnLayout";

const Benefits = () => {
  return (
    <section className="flex flex-col items-center ">
      <PadLayout padding={["l", "s", "l", "s"]}>
        <ul className=" w-full flex flex-col items-center gap-10 md:flex-wrap md:gap-x-[22px] md:gap-y-[23px] md:w-[486px] md:h-[553px]  ">
          {benefitsData.map((item) => (
            <li key={item.title} className="first:md:pt-[50px] ">
              <BenefitsCard {...item} />
            </li>
          ))}
        </ul>

        <PadLayout padding={["l", "none", "l", "none"]}>
          <CenterLayout centerText className="max-w-md ">
            <Columns gap={"m"}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold  ">
                Customer satisfaction is our first priority
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                We serve a variety of users—from solo creators to global teams.
                Task Flow helps everyone manage tasks efficiently, ensuring
                productivity and satisfaction.
              </p>
            </Columns>
          </CenterLayout>
        </PadLayout>
        <Columns>
          <Column>
            <ul className="flex flex-col">
              {benefitsDescription.map((item) => (
                <li className="" key={item.text}>
                  <BenefitsList {...item} />
                </li>
              ))}
            </ul>
          </Column>
        </Columns>
      </PadLayout>
    </section>
  );
};

export default Benefits;
