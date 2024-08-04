"use client";

import api from "@/server/api";
import { getItem } from "@/utils/localStorageUtils";
import { getSession } from "next-auth/react";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface SelfType {
  id?: number;
  name?: string;
  email?: string;
  profileImage?: string;
  loggedBy?: string;
  UserInfo?: Array<{
    id: number;
    date?: string;
    gender?: string;
    phone?: string;
    cep?: string;
    neighborhood?: string;
    ddd?: string;
    locality?: string;
    publicPlace?: string;
    uf?: string;
  }>;
  PetterInfo?: Array<{
    id: number;
    petterName?: string;
    petterKind?: string;
    petterBreed?: string;
    profileImage?: string;
    descriptionBio?: string;
  }>;
}

interface SelfContextType {
  self: SelfType;
  setSelf: (value: SelfType) => void;
  getSelf: () => Promise<void>;
  numberImagesGallery: number;
  setNumberImagesGallery: (value: number) => void;
}

const SelfContext = createContext<SelfContextType | null>(null);

interface SelfProviderProps {
  children: ReactNode;
}

export const SelfProvider: React.FC<SelfProviderProps> = ({ children }) => {
  const [self, setSelf] = useState<SelfType>({});
  const [numberImagesGallery, setNumberImagesGallery] = useState(0);

  async function getSelf() {
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

      setSelf(response.data);
    } catch (error) {
      console.error("ERROR", error);
    }
  }

  const contextValue = {
    self,
    setSelf,
    getSelf,
    numberImagesGallery,
    setNumberImagesGallery,
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
