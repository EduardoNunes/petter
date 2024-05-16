import Image from "next/image";

export default function FooterHome() {
  return (
    <div className="absolute flex items-center justify-between bottom-0 h-[7%] w-[90%] pl-2 pr-2">
      <Image
        src="/images/home.png"
        width={32}
        height={32}
        alt="Home"
        className=""
      />
      <Image
        src="/images/paw-love.png"
        width={32}
        height={32}
        alt="Paw Love"
        className=""
      />
      <Image
        src="/images/add.png"
        width={32}
        height={32}
        alt="Plus"
        className=""
      />
      <Image
        src="/images/pet-services.png"
        width={39}
        height={39}
        alt="Services"
        className=""
      />
      <Image
        src="/images/paw.png"
        width={32}
        height={32}
        alt="Paw"
        className=""
      />
    </div>
  );
}
