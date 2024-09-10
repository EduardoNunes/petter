"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";
import { useSelfContext } from "./selfContext";
import api from "@/server/api";
import errorResponse from "@/components/Error/ErrorResponse";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

interface HomeContextType {
  isOpenSearch: boolean;
  setIsOpenSearch: (value: boolean) => void;
  handleOpenProfile: (petterId: number) => Promise<void>;
}

const HomeContext = createContext<HomeContextType | null>(null);

interface HomeProviderProps {
  children: ReactNode;
}

export const HomeProvider: React.FC<HomeProviderProps> = ({
  children,
}) => {
  const {setLoading, setIsUser, setVisitantProfile, self} = useSelfContext();
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [toast, setToast] = useState("");
  const router = useRouter();

  async function handleOpenProfile(petterId: number) {
    setLoading(true);

    if (self.PetterInfo && petterId === self.PetterInfo[0].id) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }

    const session = await getSession();
    const token = session?.user.accessToken;

    try {
      const response = await api.get(
        `petter-profile-page?petterId=${petterId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setVisitantProfile(response.data);
      router.push("/pages/profile");
    } catch (error: any) {
      setLoading(false);
      const response = errorResponse(error);
      setToast(response);
    }
  }

  const contextValue: HomeContextType = {
    isOpenSearch,
    setIsOpenSearch,
    handleOpenProfile,
  };

  return (
    <HomeContext.Provider value={contextValue}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = (): HomeContextType => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error(
      "useHomeContext must be used within a HomeProvider"
    );
  }
  return context;
};
