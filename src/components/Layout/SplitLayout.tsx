import React, { useMemo, memo } from "react";
import clsx from "clsx";
import { FractionKeys, SpaceKeys, designTokens } from "./sizes";

type SplitProps = React.HTMLAttributes<HTMLDivElement> & {
  fraction?: FractionKeys;
  gap?: SpaceKeys;
  className?: string;
  children: React.ReactNode;
};

export const SplitLayout: React.FC<SplitProps> = ({
  fraction = "1/2",
  gap = "none",
  className,
  children,
  ...otherProps
}) => {
  const classes = useMemo(() => {
    const gapClass = `gap-${designTokens.spaceSchiema[gap]}`;
    const fractionClass = designTokens.fractionsSchiema[fraction];
    return { gapClass, fractionClass };
  }, [gap, fraction]);

  return (
    <div
      {...otherProps}
      className={clsx(
        "grid",
        classes.fractionClass,
        classes.gapClass,
        className
      )}
    >
      {children}
    </div>
  );
};

export default memo(SplitLayout);
