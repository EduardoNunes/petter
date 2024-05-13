import Image from "next/image";
import Button from "@/components/Button/Button";

export default function InfosDataRegister() {
  return (
    <>
      <p className="font-secondary font-bold text-medium text-center mb-[3%]">
        Dê personalidade ao seu pet e transforme-o em um Petter!
      </p>
      <p className="font-secondary text-smaller text-center mb-[4%]">
        Vamos formar a maior comunidade de fofuras do mundo!
      </p>

      <div className="w-full mb-3">
        <Button text="Cadastrar com o Google" type="externalButton">
          <Image
            src="/images/google.png"
            height={24}
            width={24}
            alt="icone Google"
          />
        </Button>
      </div>

      <Button text="Cadastrar com o Facebook" type="externalButton">
        <Image
          src="/images/facebook.png"
          height={24}
          width={24}
          alt="icone Facebook"
        />
      </Button>
    </>
  );
}
