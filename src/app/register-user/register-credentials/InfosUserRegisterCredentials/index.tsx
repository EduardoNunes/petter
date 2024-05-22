import Button from "@/components/Button/Button";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function InfosUserRegisterCredentials() {
  const HandleClickGoogleRegister = () => {
    signIn("google", { callbackUrl: "/register-user/register-infos" })
  }

  return (
    <div>
      <p className="font-secondary font-bold text-medium text-center mb-[3%]">
        Vamos fazer o seu cadastro, Tutor.
        {/* Dê personalidade ao seu pet e transforme-o em um Petter! */}
      </p>
      <p className="font-secondary text-smaller text-center mb-[4%]">
        É importante saber um pouco sobre os tutores dos Petters.
        {/* Vamos formar a maior comunidade de fofuras do mundo! */}
      </p>

      <div className="w-full mb-3">
        <Button
          text="Cadastrar com o Google"
          type="externalButton"
          onClick={() => HandleClickGoogleRegister()}
        >
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
  );
}
