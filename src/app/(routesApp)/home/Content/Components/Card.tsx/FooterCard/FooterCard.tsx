import Image from "next/image";
import React from "react";

interface FooterCardProps {
  loves: number;
  commentsLength: number;
  descriptionCard: string;
  url: string;
  handleClickComment: (
    url: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleClickLike: (
    url: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

const FooterCard: React.FC<FooterCardProps> = ({
  loves,
  commentsLength,
  descriptionCard,
  url,
  handleClickComment,
  handleClickLike,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <div className="flex items-center h-9 pl-2 pr-2 gap-3">
        <button
          className="flex items-center gap-3"
          onClick={(e) => handleClickLike(url, e)}
        >
          <Image
            src="/images/paw-love.png"
            width={28}
            height={28}
            alt="Paw Love"
          />
          <p>{loves}</p>
        </button>
        <button
          className="flex items-center gap-3"
          onClick={(e) => handleClickComment(url, e)}
        >
          <Image
            src="/images/comment.png"
            width={28}
            height={28}
            alt="Baalon comment"
          />
          <p>{commentsLength}</p>
        </button>
      </div>
      <p className="font-secondary">{descriptionCard}</p>
    </div>
  );
};

export default FooterCard;
