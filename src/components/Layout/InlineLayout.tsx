import React from "react";
import { AlignKeys, JustifyKeys, SpaceKeys, designTokens } from "./sizes";
import clsx from "clsx";

type InlineProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: SpaceKeys;
  justify?: JustifyKeys;
  align?: AlignKeys;
  className?: string;
  children: React.ReactNode;
};

const gapMap: Record<SpaceKeys, string> = {
  xs: "gap-1",
  s: "gap-2",
  m: "gap-4",
  l: "gap-8",
  xl: "gap-16",
  xxl: "gap-32",
  none: "gap-0",
};

export const InlineLayout: React.FC<InlineProps> = (props: InlineProps) => {
  const {
    gap = "none",
    justify = "center",
    align = "center",
    className,
    children,
    ...otherProps
  } = props;

  const gapClass = gapMap[gap];
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

export default InlineLayout;
