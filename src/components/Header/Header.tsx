import Image from "next/image";

interface InputProps {
  text: string;
}

export default function Header({ text }: InputProps) {
  return (
    <div className="flex justify-between">
      <div className="pl-5">
        <Image
          src="/images/arrowLeft.svg"
          width={12}
          height={12}
          alt="Throw back"
        />
      </div>
      <h1 className="font-secondary font-bold text-center">{text}</h1>
      <div className="pl-8"></div>
    </div>
  );
}
