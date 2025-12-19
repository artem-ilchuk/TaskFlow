import React, { useMemo, memo } from "react";
import clsx from "clsx";

type MediaWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  ratio?: [number, number];
  className?: string;
  children: React.ReactNode;
};

export const MediaWrapperLayout: React.FC<MediaWrapperProps> = ({
  ratio = [1, 1],
  className,
  children,
  ...otherProps
}) => {
  const style = useMemo(() => {
    const [n, d] = ratio;
    return { aspectRatio: `${n} / ${d}` };
  }, [ratio]);

  return (
    <div
      {...otherProps}
      style={style}
      className={clsx("relative w-full overflow-hidden", className)}
    >
      {React.Children.map(children, (child) => (
        <div className="absolute inset-0 flex justify-center items-center">
          {child}
        </div>
      ))}
    </div>
  );
};

export default memo(MediaWrapperLayout);
