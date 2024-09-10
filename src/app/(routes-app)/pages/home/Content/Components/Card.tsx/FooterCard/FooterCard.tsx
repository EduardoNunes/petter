import { useSelfContext } from "@/context/selfContext";
import { useTimeLineContext } from "@/context/timeLineContext";
import Image from "next/image";
import React, { useState } from "react";

interface FooterCardProps {
  likesCount: number;
  commentsCount: number;
  descriptionCard: string;
  likedByMe: boolean | undefined;
  imageId: number;
}

const FooterCard: React.FC<FooterCardProps> = ({
  likesCount,
  commentsCount,
  descriptionCard,
  likedByMe,
  imageId,
}) => {
  const {
    handleClickLikeFunction,
    handleClickShowComment,
    setTimelineImageId,
  } = useTimeLineContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(likedByMe || false);
  const [likeCount, setLikeCount] = useState(likesCount);

  const toggleText = () => setIsExpanded(!isExpanded);

  const handleClickComment =
    (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setTimelineImageId(id);
      handleClickShowComment(id, "timeline");
    };

  const handleLikeClick = async () => {
    const newLikedStatus = !isLiked;
    setIsLiked(newLikedStatus);
    setLikeCount((prev) => (newLikedStatus ? prev + 1 : prev - 1));

    try {
      await handleClickLikeFunction(imageId, "timeline");
    } catch (error) {
      setIsLiked(likedByMe || false);
      setLikeCount(likesCount);
      console.error("Erro ao curtir a imagem:", error);
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="flex items-center h-9 pl-2 pr-2 gap-3">
        <button className="flex items-center gap-3" onClick={handleLikeClick}>
          <Image
            src={isLiked ? "/images/paw-love-pink.png" : "/images/paw-love.png"}
            width={28}
            height={28}
            alt="Paw Love"
          />
          <p>{likeCount}</p>
        </button>
        <button
          className="flex items-center gap-3"
          onClick={handleClickComment(imageId)}
        >
          <Image
            src="/images/comment.png"
            width={28}
            height={28}
            alt="Baalon comment"
          />
          <p>{commentsCount}</p>
        </button>
      </div>
      <div className="break-words overflow-hidden">
        <p
          className={`font-secondary text-smaller ${
            isExpanded ? "line-clamp-none" : "line-clamp-2"
          }`}
        >
          {descriptionCard}
        </p>
        <button
          onClick={toggleText}
          className="font-secondary font-semibold text-verySmaller text-sombra"
        >
          {isExpanded ? "Ver menos" : "Ver mais..."}
        </button>
      </div>
    </div>
  );
};

export default FooterCard;
