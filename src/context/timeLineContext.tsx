"use client";

import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface TimeLineContextType {
  image: File | undefined;
  setImage: (value: File | undefined) => void;
  imageURL: string;
  setImageURL: (value: string) => void;
}

const TimeLineContext = createContext<TimeLineContextType | null>(null);

interface TimeLineProviderProps {
  children: ReactNode;
}

export const TimeLineProvider: React.FC<TimeLineProviderProps> = ({
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
    <TimeLineContext.Provider value={contextValue}>
      {children}
    </TimeLineContext.Provider>
  );
};

export const useTimeLineContext = (): TimeLineContextType => {
  const context = useContext(TimeLineContext);
  if (!context) {
    throw new Error(
      "useTimeLineContext must be used within a TimeLineProvider"
    );
  }
  return context;
};
