"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

interface EnframeContextType {
  enframe: string;
  setEnframe: (value: string) => void;
}

const EnframeContext = createContext<EnframeContextType | null>(null);

interface EnframeProviderProps {
  children: ReactNode;
}

export const EnframeProvider: React.FC<EnframeProviderProps> = ({ children }) => {
  const [enframe, setEnframe] = useState<string>("content");
console.log(enframe, "ENFRAME")
  const contextValue = {
    enframe,
    setEnframe,
  };

  return (
    <EnframeContext.Provider value={contextValue}>{children}</EnframeContext.Provider>
  );
};

export const useEnframeContext = (): EnframeContextType => {
  const context = useContext(EnframeContext);
  if (!context) {
    throw new Error("useEnframeContext must be used within a EnframeProvider");
  }
  return context;
};
