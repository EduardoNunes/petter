"use client";

import api from "@/server/api";
import { getSession } from "next-auth/react";
import React, { ReactNode, createContext, useContext, useState } from "react";
import { useSelfContext } from "./selfContext";

const ProfileContext = createContext<ProfileContextType | null>(null);

interface ProfileContextType {
  numberImagesGallery: number;
  setNumberImagesGallery: (value: number) => void;
  showImage: boolean;
  setShowImage: (value: boolean) => void;
  imageSelected: string;
  setImageSelected: (value: string) => void;
  imageSrc: string[];
  setImageSrc: (value: string[]) => void;
  loadImagesProfile: (petterId: number, newPage: number) => Promise<void>;
  loadPetterVisitantInfos: (petterId: number) => Promise<void>;
  visitantSelected: any; 
  setVisitantSelected: (value: any) => void; 
}

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const { setLoading } = useSelfContext();
  const [numberImagesGallery, setNumberImagesGallery] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [imageSelected, setImageSelected] = useState("");
  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const [visitantSelected, setVisitantSelected] = useState<any>(null);
  const [previousPetterId, setPreviousPetterId] = useState<number | null>(null);

  const loadImagesProfile = async (petterId: number, page: number) => {
    const session = await getSession();
    const token = session?.user.accessToken;

    if (petterId !== previousPetterId) {
      setImageSrc([]);
      setPreviousPetterId(petterId);
    }

    try {
      const response = await api.get(
        `show-images-profile/top-15-images?petterId=${petterId}&page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setImageSrc((prevImages) => [...prevImages, ...response.data.images]);
      setNumberImagesGallery(response.data.total);
      setLoading(false);
    } catch (error: any) {
      console.log("DEU RUIM", error);
    }
  };

  async function loadPetterVisitantInfos(petterId: number) {
    const session = await getSession();
    const token = session?.user.accessToken;

    try {
      const response = await api.get(`petter-infos?petterId=${petterId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setVisitantSelected(response.data);
      setLoading(false);
      return response.data;
    } catch (error: any) {
      console.log("DEU RUIM", error);
    }
  };

  const contextValue: ProfileContextType = {
    numberImagesGallery,
    setNumberImagesGallery,
    showImage,
    setShowImage,
    imageSelected,
    setImageSelected,
    imageSrc,
    setImageSrc,
    loadImagesProfile,
    loadPetterVisitantInfos,
    visitantSelected,
    setVisitantSelected,
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
