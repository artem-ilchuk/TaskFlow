import { FC } from "react";

import HeroSection from "../components/Sections/HeroSection";
import Benefits from "../components/Sections/BenefitsSection.jsx/Benefits";
import Footer from "../components/Sections/Footer";

const HomePage: FC = () => {
  return (
    <>
      <HeroSection />
      <Benefits />
      <Footer />
    </>
  );
};

export default HomePage;
