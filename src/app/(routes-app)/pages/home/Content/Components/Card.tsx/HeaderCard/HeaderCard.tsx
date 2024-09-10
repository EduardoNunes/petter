import { useHomeContext } from "@/context/homeContext";
import Image from "next/image";

interface HeaderCardProps {
  petterInfo: {
    descriptionBio: string;
    id: number;
    petterBreed: string;
    petterKind: string;
    petterName: string;
    profileImage: string;
    userId: number;
  };
}

export default function HeaderCard({ petterInfo }: HeaderCardProps) {
  const { handleOpenProfile } = useHomeContext();

  return (
    <div
      className="absolute flex items-center justify-between top-1 right-1 w-[32%] pl-4 gap-2 truncate rounded-full bg-branco/30"
      onClick={() => handleOpenProfile(petterInfo.id)}
    >
      <div className="w-[calc(100%-40px)] text-center">
        <h1
          className="text-small truncate"
          style={{ textShadow: "0px 0px 6px rgba(255, 255, 255, 1)" }}
          title={petterInfo.petterName}
        >
          {petterInfo.petterName}
        </h1>
      </div>
      <Image
        src={petterInfo.profileImage}
        width={32}
        height={32}
        alt={petterInfo.petterName.split(" ")[0]}
        style={{
          width: "32px",
          height: "32px",
          objectFit: "cover",
          borderRadius: "100%",
        }}
      />
    </div>
  );
}
