import React, { ReactNode } from "react";
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

  return (
    <div className={clsx("flex w-full", className)}>
      <aside className="shrink-0" style={{ flex: leftFraction }}>
        {left}
      </aside>

      <section className="flex-1" style={{ flex: rightFraction }}>
        {right}
      </section>
    </div>
  );
};

export default ScreenSplitter;
