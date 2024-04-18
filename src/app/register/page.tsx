import Button from "@/components/Button/Button";
import Petter from "@/components/Petter/Petter";
import Image from "next/image";
import FormRegister from "./FormRegister";

export default function Register() {
  return (
    <div className="flex flex-col justify-center w-[90%] h-[90%]">
      <div className="flex flex-col items-center mb-8">
        <Petter />

        <p className="font-secondary font-bold text-medium text-center mb-3">
          Dê personalidade ao seu pet e transforme-o em um Petter!
        </p>
        <p className="font-secondary text-smaller text-center mb-6">
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
      </div>

      <FormRegister />
    </div>
  );
}
