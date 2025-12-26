import React, { createContext, useContext, useMemo, memo } from "react";
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

export const Columns: React.FC<ColumnsProps> = memo(
  ({ columns = 1, gap = "none", className, children, ...otherProps }) => {
    const gapClass = useMemo(() => {
      if (typeof gap === "string") {
        return designTokens.gapClasses[gap];
      }
      return Object.entries(gap)
        .map(
          ([bp, val]) => `${bp}:${designTokens.gapClasses[val as SpaceKeys]}`
        )
        .join(" ");
    }, [gap]);

    const gridStyle = useMemo(
      () => ({
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }),
      [columns]
    );

    const contextValue = useMemo(() => ({ columns }), [columns]);

    return (
      <ColumnsContext.Provider value={contextValue}>
        <div
          {...otherProps}
          style={gridStyle}
          className={clsx("grid", gapClass, className)}
        >
          {children}
        </div>
      </ColumnsContext.Provider>
    );
  }
);

export const Column: React.FC<ColumnProps> = memo(
  ({ span = 1, className, children, ...otherProps }) => {
    const { columns } = useContext(ColumnsContext);
    const limitedSpan = Math.min(span, columns);

    const spanStyle = useMemo(
      () => ({
        gridColumn: `span ${limitedSpan} / span ${limitedSpan}`,
      }),
      [limitedSpan]
    );

    return (
      <div {...otherProps} style={spanStyle} className={className}>
        {children}
      </div>
    );
  }
);
