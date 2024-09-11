"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

interface HomeContextType {
  isOpenSearch: boolean;
  setIsOpenSearch: (value: boolean) => void;
}

const HomeContext = createContext<HomeContextType | null>(null);

interface HomeProviderProps {
  children: ReactNode;
}

export const HomeProvider: React.FC<HomeProviderProps> = ({ children }) => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const contextValue: HomeContextType = {
    isOpenSearch,
    setIsOpenSearch,
  };

  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};

export const useHomeContext = (): HomeContextType => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};
