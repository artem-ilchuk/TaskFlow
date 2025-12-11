import React from "react";
import clsx from "clsx";
import { SpaceKeys, designTokens } from "./sizes";

type LayerLayout = React.HTMLAttributes<HTMLDivElement> & {
  gap?: SpaceKeys;
  className?: string;
  children: React.ReactNode;
};

export const LayerLayout: React.FC<LayerLayout> = ({
  gap = "none",
  className,
  children,
  ...otherProps
}: LayerLayout) => {
  const gapClass = `gap-${designTokens.spaceSchiema[gap]}`;

  return (
    <div
      {...otherProps}
      className={clsx(
        "grid grid-auto-rows-max auto-rows-max grid-flow-row",
        gapClass,
        className
      )}
    >
      {children}
    </div>
  );
};

export default LayerLayout;
