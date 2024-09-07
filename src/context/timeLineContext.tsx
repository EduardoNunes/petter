"use client";

import api from "@/server/api";
import { getSession } from "next-auth/react";
import React, { ReactNode, createContext, useContext, useState } from "react";
import { useSelfContext } from "./selfContext";

interface Comment {
  id: number;
  text: string;
  commented: string;
  petterInfo: { profileImage: string; petterName: string };
}

interface TimeLineContextType {
  setLikesCount: (value: number) => void;
  setLikesCountId: (value: number) => void;
  setLikedByMe: (value: boolean) => void;
  setCommentsCount: (value: number) => void;
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
  likedByMe: boolean | undefined;
  commentsCount: number | undefined;

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

  const [likesCount, setLikesCount] = useState<number | undefined>(undefined);
  const [likesCountId, setLikesCountId] = useState<number | undefined>(
    undefined
  );
  const [likedByMe, setLikedByMe] = useState<boolean | undefined>(
    undefined
  );
  const [commentsCount, setCommentsCount] = useState<number | undefined>(
    undefined
  );
  const [commentsOpenModal, setCommentsOpenModal] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [timelineImageId, setTimelineImageId] = useState<number | undefined>(
    undefined
  );

  async function handleClickLikeFunction(
    id: number,
    type: "timeline" | "image"
  ): Promise<void> {
    if (!self.PetterInfo) {
      console.log("Não identificamos o Petter logado.");
      return;
    }

    try {
      const session = await getSession();
      const token = session?.user.accessToken;
      const payload = {
        userId: self.id,
        petterInfoId: self.PetterInfo[0].id,
        [type === "timeline" ? "timelineId" : "imageId"]: id,
      };

      const response = await api.post("like-post-timeline", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setLikesCount(response.data.likeCount);
      setLikesCountId(response.data.like.id);
      setLikedByMe(response.data.like.liked);
    } catch (error) {
      console.log("Erro ao dar like", error);
    }
  }

  async function handleClickShowComment(
    id: number,
    type: "timeline" | "image"
  ): Promise<void> {
    setCommentsOpenModal(true);
    setComments([])

    if (!self.PetterInfo) {
      console.log("Não identificamos o Petter logado.");
      return;
    }

    try {
      const session = await getSession();
      const token = session?.user.accessToken;
      const params = {
        userId: self.id,
        petterInfoId: self.PetterInfo[0].id,
        [type === "timeline" ? "timelineId" : "imageId"]: id,
      };

      const response = await api.get("comment-post-timeline", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      setComments(response.data);
      setCommentsCount(response.data.length);
    } catch (error) {
      console.log("Erro ao mostrar os comentários", error);
    }
  }

  const contextValue = {

    handleClickLikeFunction,
    comments,
    likesCount,
    setLikesCount,
    likesCountId,
    setLikesCountId,
    likedByMe,
    setLikedByMe,
    commentsCount,
    setCommentsCount,
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
