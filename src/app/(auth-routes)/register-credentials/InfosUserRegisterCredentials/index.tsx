import Button from "@/components/Button/Button";
import Loading from "@/components/Loading/Loading";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function InfosUserRegisterCredentials() {
  const [loading, setLoading] = useState(false);

  const HandleClickGoogleRegister = () => {
    setLoading(true)
    localStorage.setItem("loggedBy", "google")
    signIn("google", { callbackUrl: "/register-user/register-infos" })
  }

  return (
    <div>
      {loading && <Loading />}
      <p className="font-secondary font-bold text-medium text-center mb-2">
        Vamos fazer o seu cadastro, Tutor.
      </p>
      <p className="font-secondary text-smaller text-center mb-3">
        É importante saber um pouco sobre os tutores dos Petters.
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
