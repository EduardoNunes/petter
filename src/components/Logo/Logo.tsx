import Image from "next/image";

export default function Logo() {
  return (
    <>
      <div className="flex items-center relative flex-col w-[200px] h-[228px]">
        <div>
          <span className="text-extraLarge text-verdeForteSombra shadow-[2px 2px 2px solid black]">P</span>
          <span className="text-extraLarge text-azulForteSombra">e</span>
          <span className="text-extraLarge text-rosaForteSombra">T</span>
          <span className="text-extraLarge text-azulEscuro">T</span>
          <span className="text-extraLarge text-amareloPadrao">e</span>
          <span className="text-extraLarge text-rosaForte">R</span>
        </div>
        <Image className="absolute top-10" src="/images/logo.png" width={200} height={200} alt="Logo" />
      </div>
    </>
  );
}
