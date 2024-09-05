import { useProfileContext } from "@/context/profileContext";
import Image from "next/image";

interface InfosProfileProps {
  profileImage: string;
  petterKind: string;
  petterBreed: string;
}

export default function InfosProfile({
  profileImage,
  petterKind,
  petterBreed,
}: InfosProfileProps) {
  const { numberImagesGallery } = useProfileContext();
  const friends = "0";

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative w-24 h-24 ">
        <Image
          src={profileImage || "/images/paw.png"}
          width={40}
          height={40}
          alt="Profile Image"
          priority={true}
          className="object-cover w-24 h-24 rounded-full border-lime-950 border-solid border-[3px]"
        />
      </div>
      <div>
        <label className="font-secondary" htmlFor="text">
          Posts
        </label>
        <h2 className="text-medium">{numberImagesGallery}</h2>
      </div>
      <div>
        <label className="font-secondary" htmlFor="text">
          Amigos
        </label>
        <h2 className="text-medium">{friends}</h2>
      </div>
      <div className="w-[30%]">
        <div className="flex items-center h-8 gap-2 ">
          <Image
            src="/images/paw.png"
            width={32}
            height={32}
            alt="Profile Image"
            className="object-cover w-5 h-5"
          />
          <p className="font-secondary text-smaller truncate">{petterBreed}</p>
        </div>
        <div className="flex items-center h-8 gap-2">
          <Image
            src="/images/paw.png"
            width={32}
            height={32}
            alt="Profile Image"
            className="object-cover w-5 h-5"
          />
          <p className="font-secondary text-smaller truncate">{petterKind}</p>
        </div>
      </div>
    </div>
  );
}
