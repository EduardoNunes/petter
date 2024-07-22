"use client";

import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface PostTimeLineContextType {
  image: File | undefined;
  setImage: (value: File | undefined) => void;
  imageURL: string;
  setImageURL: (value: string) => void;
}

const PostTimeLineContext = createContext<PostTimeLineContextType | null>(null);

interface PostTimeLineProviderProps {
  children: ReactNode;
}

export const PostTimeLineProvider: React.FC<PostTimeLineProviderProps> = ({
  children,
}) => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImageURL(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [image]);

  const contextValue = {
    image,
    setImage,
    imageURL,
    setImageURL,
  };

  return (
    <PostTimeLineContext.Provider value={contextValue}>
      {children}
    </PostTimeLineContext.Provider>
  );
};

export const usePostTimeLineContext = (): PostTimeLineContextType => {
  const context = useContext(PostTimeLineContext);
  if (!context) {
    throw new Error(
      "usePostTimeLineContext must be used within a PostTimeLineProvider"
    );
  }
  return context;
};
