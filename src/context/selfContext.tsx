"use client";

import api from "@/server/api";
import SelfType from "@/types/self-types";
import { getSession } from "next-auth/react";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface SelfContextType {
  self: SelfType;
  setSelf: (value: SelfType) => void;
  getSelf: () => Promise<SelfType | undefined>;
  loading: boolean;
  setLoading: (value: boolean) => void;
  isUser: boolean;
  setIsUser: (value: boolean) => void;
  visitantProfile: number;
  setVisitantProfile: (value: number) => void;
}

const SelfContext = createContext<SelfContextType | null>(null);

interface SelfProviderProps {
  children: ReactNode;
}

export const SelfProvider: React.FC<SelfProviderProps> = ({ children }) => {
  const [self, setSelf] = useState<SelfType>({});
  const [loading, setLoading] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [visitantProfile, setVisitantProfile] = useState(0);

  async function getSelf(): Promise<SelfType | undefined> {
    const session = await getSession();
    const user = session?.user;

    if (!user) {
      return;
    }

    try {
      const response = await api.get("/users-credentials/", {
        headers: { Authorization: `Bearer ${user.accessToken}` },
        params: { email: user.email },
      });

      const {
        id,
        name,
        email,
        profileImage,
        loggedBy,
        UserInfo = [],
        PetterInfo = [],
      } = response.data;

      setSelf({
        id,
        name,
        email,
        profileImage,
        loggedBy,
        UserInfo,
        PetterInfo,
      });

      return response.data;
    } catch (error) {
      console.error("ERROR", error);
    }
  }

  const contextValue = {
    self,
    setSelf,
    getSelf,
    loading,
    setLoading,
    isUser,
    setIsUser,
    visitantProfile,
    setVisitantProfile,
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
