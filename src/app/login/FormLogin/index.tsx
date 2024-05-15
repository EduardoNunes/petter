"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { useRouter } from "next/navigation";

export default function FormLogin() {
  const router = useRouter();

  const handleClickGoOn = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    router.push("/register");
  };

  return (
    <form>
      <div className="mb-3">
        <Label labelHtmlFor="email">Email</Label>
        <Input
          text="Digite seu email."
          type="email"
          id="email"
          autoComplete="email"
        />
      </div>
      <div className="mb-2">
        <Label labelHtmlFor="password">Senha</Label>
        <Input
          text="Digite sua senha."
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <p className="mt-2 mb-8 text-end font-secondary text-azulEscuro font-bold">
          Esqueci minha senha.
        </p>
      </div>
      <div className="absolute bottom-[4vh] w-[90%]">
        <Button text="Entrar" type="internalButton" />
        <div className="flex items-center justify-center mt-[3%] gap-1">
          <p className="text-center font-secondary">Não tem conta? </p>
          <button
            type="button"
            className="text-azulEscuro font-secondary font-bold"
            onClick={handleClickGoOn}
          >
            Cadastre-se!
          </button>
        </div>
      </div>
    </form>
  );
}
