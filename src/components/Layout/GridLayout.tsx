import React from "react";
import { SpaceKeys, designTokens } from "./sizes";
import clsx from "clsx";

type Breakpoints = "sm" | "md" | "lg" | "xl";

type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: SpaceKeys | Partial<Record<Breakpoints, SpaceKeys>>;
  minItemWidth?: string;
  className?: string;
  children: React.ReactNode;
};

export const GridLayout: React.FC<GridProps> = (props: GridProps) => {
  const {
    gap = "s",
    minItemWidth = "200px",
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

  const gridColsClass = `grid-cols-[repeat(auto-fit,minmax(min(${minItemWidth},100%),1fr))]`;

  return (
    <div
      {...otherProps}
      className={clsx("grid", gridColsClass, gapClass, className)}
    >
      {children}
    </div>
  );
};

export default GridLayout;
