import React from "react";
import { createContext, useContext } from "react";
import clsx from "clsx";
import { SpaceKeys, designTokens } from "./sizes";

type Breakpoints = "sm" | "md" | "lg" | "xl";

type ColumnsProps = React.HTMLAttributes<HTMLDivElement> & {
  columns?: number;
  gap?: SpaceKeys | Partial<Record<Breakpoints, SpaceKeys>>;
  className?: string;
  children: React.ReactNode;
};

type ColumnProps = React.HTMLAttributes<HTMLDivElement> & {
  span?: number;
  className?: string;
  children: React.ReactNode;
};

const ColumnsContext = createContext({ columns: 1 });

export const Columns: React.FC<ColumnsProps> = (props: ColumnsProps) => {
  const {
    columns = 1,
    gap = "none",
    className,
    children,
    ...otherProps
  } = props;

  let gapClass = "";

  if (typeof gap === "string") {
    gapClass = designTokens.gapClasses[gap];
  } else {
    gapClass = Object.entries(gap)
      .map(([bp, val]) => `${bp}:${designTokens.gapClasses[val as SpaceKeys]}`)
      .join(" ");
  }

  const columnsClasses = `grid-cols-[repeat(${columns},_1fr)]`;

  return (
    <ColumnsContext.Provider value={{ columns }}>
      <div
        {...otherProps}
        className={clsx("grid", columnsClasses, gapClass, className)}
      >
        {children}
      </div>
    </ColumnsContext.Provider>
  );
};

export const Column: React.FC<ColumnProps> = (props: ColumnProps) => {
  const { span = 1, className, children, ...otherProps } = props;

  const { columns } = useContext(ColumnsContext);

  const limitedSpan = Math.min(span, columns);

  const spanClass = `col-span-${limitedSpan}`;

  return (
    <div {...otherProps} className={clsx(spanClass, className)}>
      {children}
    </div>
  );
};
