import { FallbackProps } from "react-error-boundary";
import React, { memo } from "react";

const ErrorBoundaryFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-4 text-center ">
      <h1 className="mb-2 text-4xl font-semibold text-red-500   pb-12">
        Oops... Something went wrong...
      </h1>

      <p className="mb-6 max-w-md text-sm text-neutral-400 pb-18">
        {error?.message || "Unknown Error"}
      </p>

      <button
        onClick={resetErrorBoundary}
        className="rounded-xl bg-red-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-red-700 active:scale-95"
      >
        Reload your application!
      </button>
    </div>
  );
};

export default memo(ErrorBoundaryFallback);
