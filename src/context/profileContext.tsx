"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

interface ProfileContextType {
  numberImagesGallery: number;
  setNumberImagesGallery: (value: number) => void;
  showImage: boolean; 
  setShowImage: (value: boolean) => void;
  imageSelected: string; 
  setImageSelected: (value: string) => void;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const [numberImagesGallery, setNumberImagesGallery] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [imageSelected, setImageSelected] = useState("");

  const contextValue: ProfileContextType = {
    numberImagesGallery,
    setNumberImagesGallery,
    showImage, 
    setShowImage,
    imageSelected, 
    setImageSelected,
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
