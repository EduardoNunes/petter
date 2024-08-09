"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

interface PostTimelineContextType {
  image: File | undefined;
  setImage: (value: File | undefined) => void;
  imageURL: string;
  setImageURL: (value: string) => void;
}

const PostTimelineContext = createContext<PostTimelineContextType | null>(null);

interface PostTimelineProviderProps {
  children: ReactNode;
}

export const PostTimelineProvider: React.FC<PostTimelineProviderProps> = ({
  children,
}) => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageURL, setImageURL] = useState("");

  const contextValue: PostTimelineContextType = {
    image,
    setImage,
    imageURL,
    setImageURL,
  };

  return (
    <PostTimelineContext.Provider value={contextValue}>
      {children}
    </PostTimelineContext.Provider>
  );
};

export const usePostTimelineContext = (): PostTimelineContextType => {
  const context = useContext(PostTimelineContext);
  if (!context) {
    throw new Error(
      "usePostTimelineContext must be used within a PostTimelineProvider"
    );
  }
  return context;
};
