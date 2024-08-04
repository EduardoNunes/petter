"use client";

import Button from "@/components/Button/Button";
import Petter from "@/components/Petter/PetterColorful";
import { signIn } from "next-auth/react";
import Image from "next/image";
import FormLogin from "./FormLogin";
import { useState } from "react";
import Loading from "@/components/Loading/Loading";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleClickGoogleLogin = () => {
    setLoading(true);
    signIn("google", { callbackUrl: "/home" });
  };

  return (
    <>
      <div className="flex items-center justify-center h-[100vh] w-[100vw]">
        {loading && <Loading />}
        <div className="h-90% w-[90%]">
          <div className="flex flex-col items-center mb-8">
            <Petter fontSize="extraLarge" />

            <p className="font-secondary font-bold text-medium text-center mt-6 mb-8">
              Vamos nos conectar?
            </p>

            <div className="w-full mb-3">
              <Button
                text="Entrar com o Google"
                type="externalButton"
                onClick={handleClickGoogleLogin}
              >
                <Image
                  src="/images/google.png"
                  height={24}
                  width={24}
                  alt="icone Google"
                />
              </Button>
            </div>

            <Button text="Entrar com o Facebook" type="externalButton">
              <Image
                src="/images/facebook.png"
                height={24}
                width={24}
                alt="icone Facebook"
              />
            </Button>
          </div>

          <FormLogin />
        </div>
      </div>
    </>
  );
}
