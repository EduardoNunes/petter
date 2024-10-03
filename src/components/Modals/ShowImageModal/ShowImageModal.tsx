import { useProfileContext } from "@/context/profileContext";
import Image from "next/image";
import "../animation.css";
import { useEffect, useState } from "react";
import { useSelfContext } from "@/context/selfContext";
import { useTimeLineContext } from "@/context/timeLineContext";
import api from "@/server/api";
import { getSession } from "next-auth/react";
import ModalComment from "../ModalComment/ModalComment";

interface PetterInfo {
  id: number;
  profileImage: string;
}

interface UserSession {
  user: {
    accessToken?: string;
    petterInfo?: PetterInfo[];
  };
}

export default function ShowImageModal() {
  const { setLoading } = useSelfContext();
  const { imageSelected, setShowImage } = useProfileContext();
  const {
    handleClickLikeFunction,
    likesCount,
    commentsOpenModal,
    setCommentsOpenModal,
    setTimelineOrGallery,
    setImageGalleryId,
    updateCommentsCount,
  } = useTimeLineContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation, setAnimation] = useState("slide-in");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likesCount);
  const [commentsCount, setCommentsCount] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    setCommentsCount(updateCommentsCount);
  }, [updateCommentsCount]);

  const toggleText = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    async function getImageData() {
      try {
        const session: UserSession | null = await getSession();

        if (!session?.user?.accessToken) {
          console.log("Token não encontrado, usuário não autenticado.");
          return;
        }

        const token = session.user.accessToken;

        const response = await api.get(
          `show-images-profile/petter-gallery-likes?petterImageId=${
            imageSelected.split(" ")[0]
          }`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const items = response.data.likes;
        setCommentsCount(response.data.commentCount);

        const petterLoggedId = session.user.petterInfo?.length
          ? session.user.petterInfo[0].id
          : null;

        const isImageLikedByMe = petterLoggedId
          ? items.some(
              (item: { petterInfoId: number }) =>
                item.petterInfoId === petterLoggedId
            )
          : false;

        setIsLiked(isImageLikedByMe);
        setLikeCount(items.length);
      } catch (error) {
        console.error("Erro ao carregar os dados da imagem", error);
      }
    }

    getImageData();
  }, [imageSelected]);

  const handleClickCloseModal = () => {
    setAnimation("slide-out");
    setTimeout(() => {
      setShowImage(false);
    }, 300);
  };

  function handleClickComment() {
    setTimelineOrGallery("image");
    setLoading(true);
    setCommentsOpenModal(true);
    setImageGalleryId(Number(imageSelected.split(" ")[0]));
  }

  const handleLikeClick = async () => {
    const newLikedStatus = !isLiked;
    setIsLiked(newLikedStatus);
    setLikeCount((prev = 0) => (newLikedStatus ? prev + 1 : prev - 1));

    try {
      await handleClickLikeFunction(
        Number(imageSelected.split(" ")[0]),
        "image"
      );
    } catch (error) {
      setLikeCount(likesCount);
      console.error("Erro ao curtir a imagem:", error);
    }
  };

  return (
    <div
      className={`absolute flex flex-col justify-between items-center top-0 left-0 h-full w-full z-10 bg-branco ${animation}`}
    >
      {commentsOpenModal && <ModalComment />}
      <div className="flex flex-col justify-center items-center w-full h-[calc(100%-210px)]">
        <Image
          src={imageSelected.split(" ")[1]}
          width={400}
          height={400}
          alt="Image Selected"
          className="object-contain h-full"
          onLoad={() => setLoading(false)}
          priority
        />
      </div>
      <div className="w-[90%]">
        <div className="w-full ">
          <p
            className={`font-secondary text-smaller break-words hyphens-auto ${
              isExpanded ? "line-clamp-none" : "line-clamp-2"
            }`}
          >
            {imageSelected.split(" ").slice(2).join(" ")}
          </p>
        </div>
        <button
          onClick={toggleText}
          className="text-start w-full font-secondary font-semibold text-verySmaller text-sombra"
        >
          {isExpanded ? "Ver menos" : "Ver mais..."}
        </button>
        <div className="flex justify-center w-[90%] h-12 py-3">
          <div className="flex w-1/3 gap-2">
            <button
              className="flex items-center gap-2"
              onClick={handleLikeClick}
            >
              <Image
                src={
                  isLiked ? "/images/paw-love-pink.png" : "/images/paw-love.png"
                }
                width={28}
                height={28}
                alt="Paw Love"
              />
              <p>{likeCount}</p>
            </button>
            <button
              className="flex items-center gap-2"
              onClick={handleClickComment}
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
          <div className="flex justify-center w-1/3">
            <button onClick={handleClickCloseModal}>
              <Image
                src="/images/exit.png"
                width={28}
                height={28}
                alt="Exit"
                className="w-6"
              />
            </button>
          </div>
          <div className="w-1/3"></div>
        </div>
      </div>
    </div>
  );
}
