import { useSelfContext } from "@/context/selfContext";
import { useStepContext } from "@/context/useStepContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeaderProps {
  showExit?: boolean;
  showArrow?: boolean;
  text: string;
  showContinue?: boolean;
  routeToGo?: string;
}

export default function Header({
  showExit = false,
  text,
  showArrow = false,
  showContinue = false,
  routeToGo,
}: HeaderProps) {
  const { handleToDecreaseCurrentStep, handleToAddCurrentStep } =
    useStepContext();
  const { loading, setLoading } = useSelfContext();
  const router = useRouter();

  const handleClickGoTo = () => {
    setLoading(true);

    router.push(`${routeToGo}`);
    const pic = localStorage.getItem("SelectedPic");

    if (pic) {
      localStorage.removeItem("SelectedPic");
    }
  };

  return (
    <div className="relative flex justify-center items-center w-full h-10">
      {showExit && (
        <button
          className="absolute left-0 cursor-pointer"
          onClick={handleClickGoTo}
        >
          <Image
            src="/images/exit.png"
            width={12}
            height={12}
            alt="Throw back"
          />
        </button>
      )}
      {showArrow && (
        <button
          className="absolute left-0 pl-2 cursor-pointer"
          onClick={handleToDecreaseCurrentStep}
        >
          <Image
            src="/images/arrowLeft.svg"
            width={12}
            height={21}
            alt="Throw back"
          />
        </button>
      )}
      <h1 className="font-secondary font-bold text-center">{text}</h1>
      {showContinue && (
        <button
          onClick={handleToAddCurrentStep}
          className="absolute font-bold right-0 font-secondary"
        >
          Continuar
        </button>
      )}
    </div>
  );
}
