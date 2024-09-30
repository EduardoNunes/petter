import Image from "next/image";

interface InfosProfileProps {
  profileImage: string;
  petterKind: string;
  petterBreed: string;
  followings: number;
  followers: number;
}

export default function InfosProfile({
  profileImage,
  petterKind,
  petterBreed,
  followings,
  followers,
}: InfosProfileProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative min-w-24 h-24 ">
        <Image
          src={profileImage || "/images/paw.png"}
          width={40}
          height={40}
          alt="Profile Image"
          priority={true}
          className="object-cover w-24 h-24 rounded-full border-lime-950 border-solid border-[3px]"
        />
      </div>
      <div className="flex flex-col items-center w-[calc(100%-96px)]">
        <div className="flex w-full">
          <div className="w-1/2">
            <div className="flex items-center gap-2">
              <h2 className="text-medium">{followings}</h2>
              <label
                className="font-secondary text-smaller truncate"
                htmlFor="text"
              >
                Seguindo
              </label>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-medium">{followers}</h2>
              <label
                className="font-secondary text-smaller truncate"
                htmlFor="text"
              >
                {followers <= 1 ? "Seguidor" : "Seguidores"}
              </label>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex items-center h-8 gap-2 ">
              <Image
                src="/images/paw.png"
                width={32}
                height={32}
                alt="Profile Image"
                className="object-cover w-5 h-5"
              />
              <p
                className="font-secondary text-smaller truncate"
                title={petterBreed}
              >
                {petterBreed}
              </p>
            </div>
            <div className="flex items-center h-8 gap-2">
              <Image
                src="/images/paw.png"
                width={32}
                height={32}
                alt="Profile Image"
                className="object-cover w-5 h-5"
              />
              <p
                className="font-secondary text-smaller truncate"
                title={petterKind}
              >
                {petterKind}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
