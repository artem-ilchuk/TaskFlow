import TextType from "../../components/UIComponents/TextTyping";
import PadLayout from "../../components/Layout/PadLayout";
import CreateNewProjectCard from "../../components/Cards/CreateNewProjectCard";
import MyprojectsCard from "../../components/Cards/MyProjectsCard";
import InlineLayout from "../../components/Layout/InlineLayout";

const DashBoardPage = () => {
  return (
    <>
      <PadLayout padding={["m", "m", "m", "s"]}>
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

        <InlineLayout gap={"xxl"} justify="center" align="center">
          <div className="flex-none">
            <CreateNewProjectCard />
          </div>
          <div className="flex-none">
            <MyprojectsCard />
          </div>
        </InlineLayout>
      </PadLayout>
    </>
  );
};

export default DashBoardPage;
