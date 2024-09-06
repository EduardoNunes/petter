import Image from "next/image";
import React from "react";

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
      <p className="font-secondary">{descriptionCard}</p>
    </div>
  );
};

export default FooterCard;
