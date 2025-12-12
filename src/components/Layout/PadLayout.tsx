import React from "react";
import clsx from "clsx";
import { SpaceKeys, designTokens } from "./sizes";

type Breakpoints = "sm" | "md" | "lg" | "xl";

type PadProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  padding?: SpaceKeys | SpaceKeys[] | Partial<Record<Breakpoints, SpaceKeys>>;
  children: React.ReactNode;
};

export const PadLayout: React.FC<PadProps> = ({
  padding,
  className,
  children,
  ...otherProps
}: PadProps) => {
  let paddingClasses: string[] = [];

  if (!padding) {
    paddingClasses.push(designTokens.padding.none);
  } else if (typeof padding === "string") {
    paddingClasses.push(designTokens.padding[padding]);
  } else if (Array.isArray(padding)) {
    const [t, r, b, l] = padding;
    paddingClasses.push(
      t ? designTokens.paddingSides[t].t : "",
      r ? designTokens.paddingSides[r].r : "",
      b ? designTokens.paddingSides[b].b : "",
      l ? designTokens.paddingSides[l].l : ""
    );
  } else if (typeof padding === "object") {
    paddingClasses.push(
      ...Object.entries(padding).map(
        ([bp, val]) => `${bp}:${designTokens.padding[val as SpaceKeys]}`
      )
    );
  }

  return (
    <div {...otherProps} className={clsx(paddingClasses, className)}>
      {children}
    </div>
  );
};

export default PadLayout;
