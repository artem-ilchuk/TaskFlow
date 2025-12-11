import React from "react";
import clsx from "clsx";
import { FractionKeys, SpaceKeys, designTokens } from "./sizes";

type SplitProps = React.HTMLAttributes<HTMLDivElement> & {
  fraction?: FractionKeys;
  gap?: SpaceKeys;
  className?: string;
  children: React.ReactNode;
};

export const SplitLayout: React.FC<SplitProps> = (props: SplitProps) => {
  const {
    fraction = "1/2",
    gap = "none",
    className,
    children,
    ...otherProps
  } = props;

  const gapClass = `gap-${designTokens.spaceSchiema[gap]}`;

  const fractionClass = designTokens.fractionsSchiema[fraction];

  return (
    <div
      {...otherProps}
      className={clsx("grid", fractionClass, gapClass, className)}
    >
      {children}
    </div>
  );
};

export default SplitLayout;
