import React from "react";

const Loading = () => {
  return (
    <div className="inset-0 top-0 left-0 fixed flex h-screen items-center justify-center bg-base-100 z-100">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-base-content/10 border-t-primary" />

        {/* Loading text */}
        <p className="text-sm text-base-content/50">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
