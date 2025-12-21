import React, { useMemo, memo } from "react";
import { AlignKeys, JustifyKeys, SpaceKeys, designTokens } from "./sizes";
import clsx from "clsx";

type Breakpoints = "sm" | "md" | "lg" | "xl";

type InlineProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: SpaceKeys | Partial<Record<Breakpoints, SpaceKeys>>;
  justify?: JustifyKeys;
  align?: AlignKeys;
  className?: string;
  children: React.ReactNode;
};

export const InlineLayout: React.FC<InlineProps> = ({
  gap = "none",
  justify = "center",
  align = "center",
  className,
  children,
  ...otherProps
}) => {
  const gapClass = useMemo(() => {
    if (typeof gap === "string") {
      return designTokens.gapClasses[gap];
    }

    return Object.entries(gap)
      .map(([bp, val]) => {
        return designTokens.responsiveGaps[bp as Breakpoints][val as SpaceKeys];
      })
      .join(" ");
  }, [gap]);

  const justifyClass = designTokens.justifySchiema[justify];
  const alignClass = designTokens.alignSchiema[align];

  return (
    <div
      {...otherProps}
      className={clsx(
        "flex flex-wrap",
        gapClass,
        justifyClass,
        alignClass,
        className
      )}
    >
      {children}
    </div>
  );
};

export default memo(InlineLayout);
