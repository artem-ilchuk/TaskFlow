import { GiCheckMark } from "react-icons/gi";
import InlineLayout from "../../../Layout/InlineLayout";
import { BenefitsListProps } from "../../../../types/homeTypes";

const BenefitsList: React.FC<BenefitsListProps> = ({ text }) => {
  return (
    <InlineLayout gap={"l"} align={"center"} justify={"center"}>
      <div className="flex items-center justify-center bg-blue-500 w-6 h-6 rounded-full shrink-0 lg:w-24 lg:h-24 ">
        <GiCheckMark className=" text-white w-2 h-2" />
      </div>
      <p className="max-w-78 whitespace-normal text-wrap text-sm lg:text-2xl">
        {text}
      </p>
    </InlineLayout>
  );
};

export default BenefitsList;
