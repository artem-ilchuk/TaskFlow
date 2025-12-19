import React, { useMemo, memo } from "react";
import clsx from "clsx";
import { SpaceKeys, designTokens } from "./sizes";

type Breakpoints = "sm" | "md" | "lg" | "xl";

type LayerLayoutProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: SpaceKeys | Partial<Record<Breakpoints, SpaceKeys>>;
  className?: string;
  children: React.ReactNode;
};

export const LayerLayout: React.FC<LayerLayoutProps> = ({
  gap = "none",
  className,
  children,
  ...otherProps
}) => {
  const gapClass = useMemo(() => {
    if (typeof gap === "string") {
      return designTokens.gapClasses[gap];
    }
    return Object.entries(gap)
      .map(([bp, val]) => `${bp}:${designTokens.gapClasses[val as SpaceKeys]}`)
      .join(" ");
  }, [gap]);

  return (
    <div
      {...otherProps}
      className={clsx("grid grid-flow-row auto-rows-max", gapClass, className)}
    >
      {children}
    </div>
  );
};

export default memo(LayerLayout);
