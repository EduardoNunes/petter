import Image from "next/image";

export default function Loading() {
  return (
    <div className="absolute flex items-center justify-center h-full w-full top-0 left-0 z-20 bg-lightGray/20">
      <Image
        src="/giffs/load-dog.gif"
        height={142}
        width={142}
        alt="icone Google"
        className="p-4 rounded-full"
        unoptimized
      />
    </div>
  );
}