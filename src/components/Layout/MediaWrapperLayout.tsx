import React from "react";
import clsx from "clsx";

type MediaWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  ratio?: [number, number];
  className?: string;
  children: React.ReactNode;
};

export const MediaWrapperLayout: React.FC<MediaWrapperProps> = (
  props: MediaWrapperProps
) => {
  const { ratio = [1, 1], className, children, ...otherProps } = props;
  const [n, d] = ratio;

  const aspectRatioClass = `aspect-[${n}/${d}]`;

  return (
    <div
      {...otherProps}
      className={clsx("relative", aspectRatioClass, className)}
    >
      {React.Children.map(children, (child) => (
        <div className="absolute inset-0 overflow-hidden flex justify-center items-center">
          {child}
        </div>
      ))}
    </div>
  );
};
export default MediaWrapperLayout;
