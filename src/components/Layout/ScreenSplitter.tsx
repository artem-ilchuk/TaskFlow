import React, { ReactNode, useMemo, memo } from "react";
import clsx from "clsx";

interface ScreenSplitterProps {
  children: [ReactNode, ReactNode];
  leftFraction?: number;
  rightFraction?: number;
  className?: string;
}

const ScreenSplitter: React.FC<ScreenSplitterProps> = ({
  children,
  leftFraction = 1,
  rightFraction = 6,
  className = "",
}) => {
  const [left, right] = children;

  const leftStyle = useMemo(() => ({ flex: leftFraction }), [leftFraction]);
  const rightStyle = useMemo(() => ({ flex: rightFraction }), [rightFraction]);

  return (
    <div className={clsx("flex w-full", className)}>
      <aside className="shrink-0" style={leftStyle}>
        {left}
      </aside>

      <section className="flex-1" style={rightStyle}>
        {right}
      </section>
    </div>
  );
};

export default memo(ScreenSplitter);
