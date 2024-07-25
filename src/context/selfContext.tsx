"use client";

import api from "@/server/api";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface SelfType {
  id?: number;
  name?: string;
  email?: string;
  profileImage?: string;
}

interface SelfPettersType {
  id?: number;
  name?: string;
  email?: string;
  profileImage?: string;
}

interface SelfContextType {
  self: SelfType;
  setSelf: (value: SelfType) => void;
  selfPetters: any; // Defina o tipo adequado para selfPetters se souber a estrutura
  setSelfPetters: (value: any) => void; // Ajuste o tipo de acordo
  getSelf: (email: string) => Promise<void>;
}

const SelfContext = createContext<SelfContextType | null>(null);

interface SelfProviderProps {
  children: ReactNode;
}

export const SelfProvider: React.FC<SelfProviderProps> = ({ children }) => {
  const [self, setSelf] = useState({});
  const [selfPetters, setSelfPetters] = useState({});

  async function getSelf(email: string): Promise<void> {
    try {
      const response = await api.get("/users-credentials/", {
        params: { email },
      });

      setSelf(response.data);
    } catch (error) {
      console.error("ERROR", error);
    }
  }
  console.log("SELF", self);
  const contextValue = {
    self,
    setSelf,
    selfPetters,
    setSelfPetters,
    getSelf,
  };
  return (
    <SelfContext.Provider value={contextValue}>{children}</SelfContext.Provider>
  );
};

export const useSelfContext = (): SelfContextType => {
  const context = useContext(SelfContext);
  if (!context) {
    throw new Error("useSelfContext must be used within a SelfProvider");
  }
  return context;
};
