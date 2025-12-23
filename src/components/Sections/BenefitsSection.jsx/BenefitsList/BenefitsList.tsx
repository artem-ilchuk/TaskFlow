import { GiCheckMark } from "react-icons/gi";
import InlineLayout from "../../../Layout/InlineLayout";
import { BenefitsListProps } from "../../../../types/homeTypes";
import React, { memo } from "react";

const BenefitsList: React.FC<BenefitsListProps> = ({ text }) => {
  return (
    <InlineLayout
      gap={{ sm: "l", lg: "xl" }}
      align={"center"}
      justify={"center"}
    >
      <div className="flex items-center justify-center bg-blue-500 w-6 h-6 rounded-full shrink-0 lg:w-8 lg:h-8 cursor-default">
        <GiCheckMark className="text-white w-2 h-2 lg:w-4 lg:h-4" />
      </div>
      <p className="max-w-78 whitespace-normal text-wrap text-sm lg:text-xl cursor-default select-none text-text">
        {text}
      </p>
    </InlineLayout>
  );
};

export default memo(BenefitsList);
