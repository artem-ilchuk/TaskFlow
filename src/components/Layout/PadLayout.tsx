import React from "react";
import clsx from "clsx";
import { SpaceKeys, designTokens } from "./sizes";

type PadProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  padding?: SpaceKeys | SpaceKeys[];
  children: React.ReactNode;
};

export const PadLayout: React.FC<PadProps> = (props: PadProps) => {
  const { padding, className, children, ...otherProps } = props;

  let paddingClasses = "";

  if (!padding) {
    paddingClasses = `p-${designTokens.spaceSchiema.none}`;
  } else if (Array.isArray(padding)) {
    paddingClasses = padding
      .map((p) => `p-${designTokens.spaceSchiema[p]}`)
      .join(" ");
  } else {
    paddingClasses = `p-${designTokens.spaceSchiema[padding]}`;
  }
  return (
    <div {...otherProps} className={clsx(paddingClasses, className)}>
      {children}
    </div>
  );
};

export default PadLayout;
