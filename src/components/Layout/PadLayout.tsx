import React, { useMemo, memo } from "react";
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
}) => {
  const paddingClass = useMemo(() => {
    const classes: string[] = [];

    if (!padding) {
      classes.push(designTokens.padding.none);
    } else if (typeof padding === "string") {
      classes.push(designTokens.padding[padding]);
    } else if (Array.isArray(padding)) {
      const [t, r, b, l] = padding;
      if (t) classes.push(designTokens.paddingSides[t].t);
      if (r) classes.push(designTokens.paddingSides[r].r);
      if (b) classes.push(designTokens.paddingSides[b].b);
      if (l) classes.push(designTokens.paddingSides[l].l);
    } else if (typeof padding === "object") {
      Object.entries(padding).forEach(([bp, val]) => {
        classes.push(`${bp}:${designTokens.padding[val as SpaceKeys]}`);
      });
    }

    return classes.join(" ");
  }, [padding]);

  return (
    <div {...otherProps} className={clsx(paddingClass, className)}>
      {children}
    </div>
  );
};

export default memo(PadLayout);
