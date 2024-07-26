import Image from "next/image";
import React from "react";

interface FooterCardProps {
  loves: number;
  commentsLength: number;
  descriptionCard: string;
}

const FooterCard: React.FC<FooterCardProps> = ({
  loves,
  commentsLength,
  descriptionCard,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <div className="flex items-center h-9 pl-2 pr-2 gap-3">
        <Image
          src="/images/paw-love.png"
          width={28}
          height={28}
          alt="Paw Love"
        />
        <p>{loves}</p>
        <Image
          src="/images/comment.png"
          width={28}
          height={28}
          alt="Baalon comment"
        />
        <p>{commentsLength}</p>
      </div>
      <p className="font-secondary">{descriptionCard}</p>
    </div>
  );
};

export default FooterCard;
