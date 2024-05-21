"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function FormLogin() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleClickGoOn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push("/register");
  };

  const handleClickGoHome = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push("/home");
  };

  
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("PASS", password)
    setPassword(event.target.value);
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
          onChange={handleEmailChange}
        />
      </div>
      <div className="mb-2">
        <Label labelHtmlFor="password">Senha</Label>
        <Input
          text="Digite sua senha."
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handlePasswordChange}
        />
        <p className="mt-2 mb-8 text-end font-secondary text-azulEscuro font-bold">
          Esqueci minha senha.
        </p>
      </div>
      <div className="absolute bottom-[4vh] w-[90%]">
        <Button
          text="Entrar"
          type="internalButton"
          onClick={handleClickGoHome}
        />
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
