import { FC } from "react";

import TextType from "../components/UIComponents/TextTyping";
import PadLayout from "../components/Layout/PadLayout";
import CreateNewProjectCard from "../components/Cards/CreateNewProjectCard";
import MyprojectsCard from "../components/Cards/MyProjectsCard";
import GridLayout from "../components/Layout/GridLayout";

const DashBoardPage: FC = () => {
  return (
    <>
      <PadLayout padding={["m", "m", "m", "s"]}>
        <GridLayout gap={"xl"}>
          <div className="min-h-14 ">
            <TextType
              className="
              text-xl md:text-2xl font-semibold
              bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500
              bg-clip-text text-transparent
            "
              cursorClassName="text-indigo-500"
              text={[
                "Welcome to TaskFlow!  We`re glad you`ve finally joined us. Let`s get things done together!",
              ]}
              typingSpeed={120}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
            />
          </div>

          <ul className="flex flex-row gap-8  pl-8 ">
            <li>
              <CreateNewProjectCard />
            </li>
            <li>
              <MyprojectsCard />
            </li>
          </ul>
        </GridLayout>
      </PadLayout>
    </>
  );
};

export default DashBoardPage;
