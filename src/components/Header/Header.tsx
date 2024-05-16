import { useStepContext } from "@/context/useStepContext";
import Image from "next/image";

interface HeaderProps {
  showArrow?: boolean;
  text: string;
  showContinue?: boolean;
}

export default function Header({
  text,
  showArrow = false,
  showContinue = false,
}: HeaderProps) {
  const { handleToDecreaseCurrentStep, handleToAddCurrentStep } =
    useStepContext();

  return (
    <div className="absolute flex justify-center items-center top-2 w-[90%] h-10 bg-red">
      {showArrow && (
        <button
          className="absolute left-0 pl-2 cursor-pointer"
          onClick={handleToDecreaseCurrentStep}
        >
          <Image
            src="/images/arrowLeft.svg"
            width={12}
            height={12}
            alt="Throw back"
          />
        </button>
      )}
      <h1 className="font-secondary font-bold text-center">{text}</h1>
      {showContinue && (
        <button
          onClick={handleToAddCurrentStep}
          className="absolute right-0 font-secondary"
        >
          Continuar
        </button>
      )}
    </div>
  );
}
