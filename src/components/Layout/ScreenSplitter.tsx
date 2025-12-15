import clsx from "clsx";

const ScreenSplitter = ({
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
