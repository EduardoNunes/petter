"use client";

import api from "@/server/api";
import { getItem } from "@/utils/localStorageUtils";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface TimeLineContextType {
  image: File | undefined;
  setImage: (value: File | undefined) => void;
  imageURL: string;
  setImageURL: (value: string) => void;
  setLikesCount: (value: number) => void;
  commentsOpenModal: boolean;
  setCommentsOpenModal: (value: boolean) => void;

  handleClickLikeFunction: (
    id: number,
    type: "timeline" | "image"
  ) => Promise<void>;

  likesCount: number | undefined;

  handleClickCommentFunction: (
    id: number,
    type: "timeline" | "image"
  ) => Promise<void>;

  commentsCount: number | undefined;
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
  const [likesCount, setLikesCount] = useState<number | undefined>(undefined);
  const [commentsOpenModal, setCommentsOpenModal] = useState<boolean>(false);
  const [commentsCount, setCommentsCount] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImageURL(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [image]);

  async function handleClickLikeFunction(
    id: number,
    type: "timeline" | "image"
  ): Promise<void> {
    const userId = getItem("userId");
    const petterId = getItem("petterId");

    try {
      const payload = {
        userId: Number(userId),
        petterInfoId: Number(petterId),
        [type === "timeline" ? "timelineId" : "imageId"]: id,
      };

      const response = await api.post("like-post-timeline", payload);
      setLikesCount(response.data.likeCount);
    } catch (error) {
      console.log("Erro ao dar like", error);
    }
  }

  async function handleClickCommentFunction(
    id: number,
    type: "timeline" | "image"
  ): Promise<void> {
    const userId = getItem("userId");
    const petterId = getItem("petterId");
    setCommentsOpenModal(true);

    try {
      const payload = {
        userId: Number(userId),
        petterInfoId: Number(petterId),
        [type === "timeline" ? "timelineId" : "imageId"]: id,
      };
      console.log(payload);
      const response = await api.get("comment-post-timeline", payload);
      setCommentsCount(response.data.commentCount);
    } catch (error) {
      console.log("Eerro ao mostrar os comentários", error);
    }
  }

  const contextValue = {
    image,
    setImage,
    imageURL,
    setImageURL,
    handleClickLikeFunction,
    commentsCount,
    likesCount,
    setLikesCount,
    handleClickCommentFunction,
    commentsOpenModal,
    setCommentsOpenModal,
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
