import React, { createContext, useContext, useMemo, memo } from "react";
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
  children?: React.ReactNode;
};

const CardContext = createContext<CardContextType | null>(null);

const Header = memo(({ children }: SectionProps) => {
  const context = useContext(CardContext);
  if (!context) throw new Error("Card.Header must be used inside <Card />");

  return (
    <PadLayout>
      {context.title && (
        <div className="font-semibold text-lg">{context.title}</div>
      )}
      {children}
    </PadLayout>
  );
});

const Body = memo(({ children }: SectionProps) => (
  <PadLayout>{children}</PadLayout>
));

const Footer = memo(({ children }: SectionProps) => (
  <PadLayout>{children}</PadLayout>
));

const CardBase: React.FC<CardProps> = ({ title, children, className }) => {
  const contextValue = useMemo(() => ({ title }), [title]);

  return (
    <CardContext.Provider value={contextValue}>
      <PadLayout
        className={`overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-sm ${className}`}
      >
        {children}
      </PadLayout>
    </CardContext.Provider>
  );
};

const CardMemo = memo(CardBase);

type CardComponent = typeof CardMemo & {
  Header: typeof Header;
  Body: typeof Body;
  Footer: typeof Footer;
};

const Card = CardMemo as CardComponent;

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
