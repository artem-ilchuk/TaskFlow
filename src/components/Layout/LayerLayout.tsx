import React from "react";
import clsx from "clsx";
import { SpaceKeys, designTokens } from "./sizes";

type Breakpoints = "sm" | "md" | "lg" | "xl";

type LayerLayout = React.HTMLAttributes<HTMLDivElement> & {
  gap?: SpaceKeys | Partial<Record<Breakpoints, SpaceKeys>>;
  className?: string;
  children: React.ReactNode;
};

export const LayerLayout: React.FC<LayerLayout> = ({
  gap = "none",
  className,
  children,
  ...otherProps
}: LayerLayout) => {
  let gapClass = "";

  if (typeof gap === "string") {
    gapClass = designTokens.gapClasses[gap];
  } else {
    gapClass = Object.entries(gap)
      .map(([bp, val]) => `${bp}:${designTokens.gapClasses[val as SpaceKeys]}`)
      .join(" ");
  }

  return (
    <div
      {...otherProps}
      className={clsx("grid grid-flow-row auto-rows-max", gapClass, className)}
    >
      {children}
    </div>
  );
};

export default LayerLayout;
