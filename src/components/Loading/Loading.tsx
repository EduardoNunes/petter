import Image from "next/image";

export default function Loading() {
  return (
    <div className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] ">
      <Image
        src="/giffs/load-dog.gif"
        height={142}
        width={142}
        alt="icone Google"
        className="p-4 rounded-full"
      />
    </div>
  );
}
