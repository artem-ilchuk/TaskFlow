import React, { useMemo, memo } from "react";
import { SpaceKeys, designTokens } from "./sizes";
import clsx from "clsx";

type Breakpoints = "sm" | "md" | "lg" | "xl";

type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: SpaceKeys | Partial<Record<Breakpoints, SpaceKeys>>;
  minItemWidth?: string;
  className?: string;
  children: React.ReactNode;
};

export const GridLayout: React.FC<GridProps> = ({
  gap = "s",
  minItemWidth = "200px",
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

  const gridStyle = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: `repeat(auto-fit, minmax(min(${minItemWidth}, 100%), 1fr))`,
    }),
    [minItemWidth]
  );

  return (
    <div
      {...otherProps}
      style={gridStyle}
      className={clsx("grid", gapClass, className)}
    >
      {children}
    </div>
  );
};

export default memo(GridLayout);
