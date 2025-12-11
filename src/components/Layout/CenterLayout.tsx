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

  const style = maxWidth ? { maxWidth } : undefined;
};
export default CenterLayout;
