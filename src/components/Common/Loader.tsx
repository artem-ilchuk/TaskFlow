import React, { useEffect, useState, memo, ReactNode } from "react";
import { ScaleLoader } from "react-spinners";

interface LoaderProps {
  height?: number;
  width?: number;
  color?: string;
  margin?: number;
  show?: boolean;
  delay?: number;
  children?: ReactNode;
}

const Loader: React.FC<LoaderProps> = ({
  height = 50,
  width = 8,
  color = "#9e40ba",
  margin = 4,
  show = false,
  delay = 0,
  children = null,
}) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!show) {
      setShowLoader(false);
      return;
    }

    if (delay === 0) {
      setShowLoader(true);
    } else {
      timeoutId = setTimeout(() => setShowLoader(true), delay);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [show, delay]);

  if (!showLoader) {
    return <>{children}</>;
  }

  return (
    <div className="flex justify-center items-center">
      <ScaleLoader
        height={height}
        width={width}
        color={color}
        margin={margin}
      />
    </div>
  );
};

export default memo(Loader);
