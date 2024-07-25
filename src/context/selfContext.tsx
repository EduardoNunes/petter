"use client";

import api from "@/server/api";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface SelfType {
  id?: number;
  name?: string;
  email?: string;
  profileImage?: string;
}

interface SelfPetterType {
  petterName?: string;
  petterKind?: string;
  petterBreed?: string;
  petterBirth?: string;
  userId?: number;
  profileImage?: string;
  descriptionBio?: string;
}

interface SelfContextType {
  self: SelfType;
  setSelf: (value: SelfType) => void;
  getSelf: (email: string) => Promise<void>;
  selfPetter: SelfPetterType;
  setSelfPetter: (value: SelfPetterType) => void;
  getSelfPetter: (petterId: number) => Promise<void>;
}

const SelfContext = createContext<SelfContextType | null>(null);

interface SelfProviderProps {
  children: ReactNode;
}

export const SelfProvider: React.FC<SelfProviderProps> = ({ children }) => {
  const [self, setSelf] = useState<SelfType>({});
  const [selfPetter, setSelfPetter] = useState<SelfPetterType>({});

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

  async function getSelfPetter(petterId: number): Promise<void> {
    try {
      const response = await api.get("petter-infos", {
        params: { petterId },
      });

      setSelfPetter(response.data);
    } catch (error) {
      console.error("ERROR", error);
    }
  }

  const contextValue = {
    self,
    setSelf,
    getSelf,
    selfPetter,
    setSelfPetter,
    getSelfPetter,
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
