import Image from "next/image";

export default function Logo() {
  return (
    <>
      <div className="flex items-center relative flex-col w-[200px] h-[228px]">
        <div>
          <span className="text-extraLarge text-azulPalido">P</span>
          <span className="text-extraLarge text-rosaClaro">e</span>
          <span className="text-extraLarge text-verdePastel">T</span>
          <span className="text-extraLarge text-verdePastel">T</span>
          <span className="text-extraLarge text-rosaClaro">e</span>
          <span className="text-extraLarge text-azulPalido">R</span>
        </div>
        <Image className="absolute top-10" src="/images/logo.png" width={200} height={200} alt="Logo" />
      </div>
    </>
  );
}
