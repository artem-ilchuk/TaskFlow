import React from "react";
import { SpaceKeys, designTokens } from "./sizes";
import clsx from "clsx";

type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: SpaceKeys;
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

  const gapClass = `gap-${designTokens.spaceSchiema[gap]}`;
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
