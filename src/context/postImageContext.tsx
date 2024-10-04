"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

interface PostImageContextType {
  image: File | undefined;
  setImage: (value: File | undefined) => void;
  imageURL: string;
  setImageURL: (value: string) => void;
  timelineOrGallery: string;
  setTimelineOrGallery: (value: string) => void;
}

const PostImageContext = createContext<PostImageContextType | null>(null);

interface PostImageProviderProps {
  children: ReactNode;
}

export const PostImageProvider: React.FC<PostImageProviderProps> = ({
  children,
}) => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageURL, setImageURL] = useState("");
  const [timelineOrGallery, setTimelineOrGallery] = useState("");

  const contextValue: PostImageContextType = {
    image,
    setImage,
    imageURL,
    setImageURL,
    timelineOrGallery,
    setTimelineOrGallery,
  };

  return (
    <PostImageContext.Provider value={contextValue}>
      {children}
    </PostImageContext.Provider>
  );
};

export const usePostImageContext = (): PostImageContextType => {
  const context = useContext(PostImageContext);
  if (!context) {
    throw new Error(
      "usePostImageContext must be used within a PostImageProvider"
    );
  }
  return context;
};
