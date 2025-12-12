import React from "react";
import clsx from "clsx";

type CenterProps = React.HTMLAttributes<HTMLDivElement> & {
  maxWidth?: string;
  centerText?: boolean;
  centerContent?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const CenterLayout: React.FC<CenterProps> = (props: CenterProps) => {
  const {
    maxWidth,
    centerText = false,
    centerContent = false,
    className,
    children,
    ...otherProps
  } = props;

  const style = maxWidth
    ? { maxWidth, marginLeft: "auto", marginRight: "auto" }
    : undefined;

  return (
    <div
      {...otherProps}
      style={style}
      className={clsx(
        maxWidth && "w-full",
        centerText && "text-center",
        centerContent && "flex justify-center items-center",
        className
      )}
    >
      {children}
    </div>
  );
};

export default CenterLayout;
