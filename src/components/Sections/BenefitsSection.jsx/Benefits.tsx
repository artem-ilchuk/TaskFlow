import BenefitsCard from "./BenefitsCards/BenefitsCard";
import BenefitsList from "./BenefitsList/BenefitsList";
import { benefitsData } from "../../../data/benefitsData";
import { benefitsDescription } from "../../../data/benefitsDescription";

const Benefits = () => {
  return (
    <section className="flex flex-col items-center gap-20 px-5 py-24">
      <ul className=" w-full flex flex-col items-center gap-10 md:flex-wrap md:gap-x-[22px] md:gap-y-[23px] md:w-[486px] md:h-[553px]  ">
        {benefitsData.map((item) => (
          <li key={item.title} className="first:md:pt-[50px] ">
            <BenefitsCard {...item} />
          </li>
        ))}
      </ul>

      <div className="max-w-md text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold pb-6 ">
          Customer satisfaction is our first priority
        </h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          We serve a variety of users—from solo creators to global teams. Task
          Flow helps everyone manage tasks efficiently, ensuring productivity
          and satisfaction.
        </p>
        <ul className="flex flex-col">
          {benefitsDescription.map((item) => (
            <li className="" key={item.text}>
              <BenefitsList {...item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Benefits;
