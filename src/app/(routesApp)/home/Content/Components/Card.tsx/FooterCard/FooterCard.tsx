import Image from "next/image";
import React from "react";

interface FooterCardProps {
  loves: number;
  commentsLength: number;
}

const FooterCard: React.FC<FooterCardProps> = ({ loves, commentsLength }) => {
  return (
    <div className="flex items-center h-9 mb-2 pl-2 pr-2 gap-3">
      <Image src="/images/paw-love.png" width={28} height={28} alt="Paw Love" />
      <p>{loves}</p>
      <Image
        src="/images/comment.png"
        width={28}
        height={28}
        alt="Baalon comment"
      />
      <p>{commentsLength}</p>
    </div>
  );
};

export default FooterCard;
