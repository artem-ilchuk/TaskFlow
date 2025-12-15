import React, { createContext, useContext } from "react";
import PadLayout from "../Layout/PadLayout";

type CardContextType = {
  title?: React.ReactNode;
};

type CardProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

type SectionProps = {
  children: React.ReactNode;
};

const CardContext = createContext<CardContextType | null>(null);

const Header = ({ children }: SectionProps) => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("Card.Header must be used inside <Card />");
  }
  return (
    <PadLayout>
      {context.title && <div className="font-semibold">{context.title}</div>}
      {children}
    </PadLayout>
  );
};

const Body = ({ children }: SectionProps) => {
  return <PadLayout>{children}</PadLayout>;
};

const Footer = ({ children }: SectionProps) => {
  return <PadLayout>{children}</PadLayout>;
};

const Card = ({ title, children, className }: CardProps) => {
  return (
    <CardContext.Provider value={{ title }}>
      <PadLayout className={className}>{children}</PadLayout>
    </CardContext.Provider>
  );
};

export default Card;

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
