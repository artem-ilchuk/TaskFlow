import { FC, memo } from "react";
import { motion } from "framer-motion";
import TextType from "../components/UIComponents/TextTyping";
import PadLayout from "../components/Layout/PadLayout";
import CreateNewProjectCard from "../components/Cards/CreateNewProjectCard";
import MyProjectsCard from "../components/Cards/MyProjectsCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const DashBoardPage: FC = () => {
  return (
    <PadLayout padding={["m", "m", "m", "s"]}>
      <div className="flex flex-col gap-12">
        <div className="min-h-14">
          <TextType
            className="
                text-xl md:text-2xl font-semibold
                bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500
                bg-clip-text text-transparent
              "
            cursorClassName="text-indigo-500"
            text={[
              "Welcome to TaskFlow! We're glad you've finally joined us. Let's get things done together!",
            ]}
            typingSpeed={120}
            pauseDuration={2000}
            showCursor={true}
            cursorCharacter="|"
          />
        </div>
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-row flex-wrap gap-6"
        >
          <motion.li
            variants={itemVariants}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
          >
            <CreateNewProjectCard />
          </motion.li>
          <motion.li
            variants={itemVariants}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
          >
            <MyProjectsCard id="1" title="Mobile App Development" />
          </motion.li>

          <motion.li
            variants={itemVariants}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
          >
            <MyProjectsCard id="2" title="Backend Refactoring" />
          </motion.li>

          <motion.li
            variants={itemVariants}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
          >
            <MyProjectsCard id="3" title="UI/UX Design Audit" />
          </motion.li>
        </motion.ul>
      </div>
    </PadLayout>
  );
};

export default memo(DashBoardPage);
