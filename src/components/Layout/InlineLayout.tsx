import React from "react";
import { AlignKeys, JustifyKeys, SpaceKeys, designTokens } from "./sizes";
import clsx from "clsx";

type Breakpoints = "sm" | "md" | "lg" | "xl";

type InlineProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: SpaceKeys | Partial<Record<Breakpoints, SpaceKeys>>;
  justify?: JustifyKeys;
  align?: AlignKeys;
  className?: string;
  children: React.ReactNode;
};

export const InlineLayout: React.FC<InlineProps> = (props: InlineProps) => {
  const {
    gap = "none",
    justify = "center",
    align = "center",
    className,
    children,
    ...otherProps
  } = props;

  let gapClass = "";

  if (typeof gap === "string") {
    gapClass = designTokens.gapClasses[gap];
  } else {
    gapClass = Object.entries(gap)
      .map(([bp, val]) => `${bp}:${designTokens.gapClasses[val as SpaceKeys]}`)
      .join(" ");
  }

  const justifyClass = designTokens.justifySchiema[justify];
  const alignClass = designTokens.alignSchiema[align];

  return (
    <div
      {...otherProps}
      className={clsx(
        "flex flex-wrap",
        gapClass,
        justifyClass,
        alignClass,
        className
      )}
    >
      {children}
    </div>
  );
};

export default InlineLayout;
