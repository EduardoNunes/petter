import Image from "next/image";

interface HeaderProfileProps {
  petterName: string;
}

export default function HeaderProfile({ petterName }: HeaderProfileProps) {
  return (
    <div className="absolute top-2 flex items-center justify-between h-[7%] w-[90%]">
      <div>
        <h1 className="text-extraLarge1">{petterName}</h1>
      </div>
      <div className="flex h-8 gap-2">
        <Image
          src="/images/add.png"
          width={32}
          height={32}
          alt="Home"
          className=""
        />
        <Image
          src="/images/menu-hamburguer.png"
          width={39}
          height={39}
          alt="Home"
          className="h-auto w-auto"
        />
      </div>
    </div>
  );
}
