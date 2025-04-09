"use client";

import { useEffect, useState } from "react";

export const Loader = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/25 backdrop-blur">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-4 text-white font-semibold text-lg">Loading...</span>
    </div>
  );
};
