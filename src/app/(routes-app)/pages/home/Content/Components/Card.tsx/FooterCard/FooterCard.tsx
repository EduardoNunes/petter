import Image from "next/image";
import React, { useState } from "react";

interface FooterCardProps {
  likesCount: number;
  commentsCount: number;
  descriptionCard: string;
  likedByMe: Array<any> | undefined;
  handleClickComment: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleClickLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
  petterLoggedId: number | undefined;
}

const FooterCard: React.FC<FooterCardProps> = ({
  likesCount,
  commentsCount,
  descriptionCard,
  likedByMe,
  handleClickComment,
  handleClickLike,
  petterLoggedId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleText = () => setIsExpanded(!isExpanded);

  return (
    <div className="flex flex-col mb-4">
      <div className="flex items-center h-9 pl-2 pr-2 gap-3">
        <button
          className="flex items-center gap-3"
          onClick={(e) => handleClickLike(e)}
        >
          <Image
            src={`${
              likedByMe?.some((item) => item.petterInfoId === petterLoggedId)
                ? "/images/paw-love-pink.png"
                : "/images/paw-love.png"
            }`}
            width={28}
            height={28}
            alt="Paw Love"
          />
          <p>{likesCount}</p>
        </button>
        <button
          className="flex items-center gap-3"
          onClick={(e) => handleClickComment(e)}
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
          className="font-secondary text-smaller text-azulEscuroSombra"
        >
          {isExpanded ? "Ver menos" : "Ver mais..."}
        </button>
      </div>
    </div>
  );
};

export default FooterCard;
