"use client";

import api from "@/server/api";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSelfContext } from "./selfContext";

interface Comment {
  id: number;
  text: string;
  commented: string;
  petterInfo: { profileImage: string; petterName: string };
}

interface TimeLineContextType {
  image: File | undefined;
  setImage: (value: File | undefined) => void;
  imageURL: string;
  setImageURL: (value: string) => void;
  setLikesCount: (value: number) => void;
  setLikesCountId: (value: number) => void;
  timelineImageId: number | undefined;
  setTimelineImageId: (value: number | undefined) => void;
  commentsOpenModal: boolean;
  setCommentsOpenModal: (value: boolean) => void;

  handleClickLikeFunction: (
    id: number,
    type: "timeline" | "image"
  ) => Promise<void>;

  likesCount: number | undefined;
  likesCountId: number | undefined;

  handleClickShowComment: (
    id: number,
    type: "timeline" | "image"
  ) => Promise<void>;

  comments: Comment[];
}

const TimeLineContext = createContext<TimeLineContextType | null>(null);

interface TimeLineProviderProps {
  children: ReactNode;
}

export const TimeLineProvider: React.FC<TimeLineProviderProps> = ({
  children,
}) => {
  const { self } = useSelfContext();
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageURL, setImageURL] = useState("");
  const [likesCount, setLikesCount] = useState<number | undefined>(undefined);
  const [likesCountId, setLikesCountId] = useState<number | undefined>(undefined);
  const [commentsOpenModal, setCommentsOpenModal] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [timelineImageId, setTimelineImageId] = useState<number | undefined>(
    undefined
  );

 /*  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImageURL(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [image]); */

  async function handleClickLikeFunction(
    id: number,
    type: "timeline" | "image"
  ): Promise<void> {
    if (!self.PetterInfo) {
      console.log("Não identificamos o Petter logado.");
      return;
    }

    try {
      const payload = {
        userId: self.id,
        petterInfoId: self.PetterInfo[0].id,
        [type === "timeline" ? "timelineId" : "imageId"]: id,
      };

      const response = await api.post("like-post-timeline", payload);
      setLikesCount(response.data.likeCount);
      setLikesCountId(response.data.like.id);
    } catch (error) {
      console.log("Erro ao dar like", error);
    }
  }

  async function handleClickShowComment(
    id: number,
    type: "timeline" | "image"
  ): Promise<void> {
    setCommentsOpenModal(true);

    if (!self.PetterInfo) {
      console.log("Não identificamos o Petter logado.");
      return;
    }

    try {
      const params = {
        userId: self.id,
        petterInfoId: self.PetterInfo[0].id,
        [type === "timeline" ? "timelineId" : "imageId"]: id,
      };

      const response = await api.get("comment-post-timeline", { params });
      setComments(response.data);
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
    comments,
    likesCount,
    setLikesCount,
    likesCountId,
    setLikesCountId,
    handleClickShowComment,
    commentsOpenModal,
    setCommentsOpenModal,
    timelineImageId,
    setTimelineImageId,
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
