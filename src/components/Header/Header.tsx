import { useStepContext } from "@/context/useStepContext";
import Image from "next/image";

interface InputProps {
  text: string;
}

export default function Header({ text }: InputProps) {
  const { handleToDecreaseCurrentStep } = useStepContext();

  return (
    <div className="absolute flex justify-between top-5 w-[90%] h-10 bg-red">
      <div
        className="pl-2 cursor-pointer"
        onClick={handleToDecreaseCurrentStep}
      >
        <Image
          src="/images/arrowLeft.svg"
          width={12}
          height={12}
          alt="Throw back"
        />
      </div>
      <h1 className="font-secondary font-bold text-center">{text}</h1>
      <div className="w-[20px]"></div>
    </div>
  );
}
