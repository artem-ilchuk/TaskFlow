import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Variants, easeOut } from "framer-motion";
import { BenefitsCardProps } from "../../../../types/homeTypes";
import React, { memo } from "react";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const BenefitsCard: React.FC<BenefitsCardProps> = ({
  title,
  prefix,
  text,
  color,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col items-center justify-center gap-3 w-85 h-48 rounded-2xl bg-white shadow-[0_25px_100px_rgba(76,64,247,0.08)] p-6 md:w-[232px] md:h-[239px]  lg:w-[270px] lg:h-[300px] "
    >
      <h3
        className={`text-4xl md:text-5xl font-semibold text-center `}
        style={{ color }}
      >
        {inView ? (
          <CountUp start={0} end={title} duration={3} separator="," />
        ) : (
          0
        )}
        {prefix}
      </h3>
      <p className="text-center text-sm md:text-base text-gray-600 max-w-60">
        {text}
      </p>
    </motion.div>
  );
};

export default memo(BenefitsCard);
