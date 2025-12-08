import { GiCheckMark } from "react-icons/gi";

const BenefitsList = ({ text }) => {
  return (
    <div className="flex flex-row items-center gap-24 md:gap-16 lg:gap-24  ">
      <div className="flex items-center justify-center bg-blue-500 w-20 h-20 rounded-full shrink-0 lg:w-24 lg:h-24 ">
        <GiCheckMark className="bg-white" />
      </div>
      <p className="text-lg lg:text-2xl">{text}</p>
    </div>
  );
};

export default BenefitsList;
