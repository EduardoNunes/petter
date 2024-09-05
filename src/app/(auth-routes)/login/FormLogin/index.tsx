"use client";

import Button from "@/components/Button/Button";
import MessageToast from "@/components/Error/MessageToast";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { useSelfContext } from "@/context/selfContext";
import redirectTo from "@/utils/RedirectTo";
import { schemaLoginUser } from "@/validation/schemaLoginUser";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setLoading } = useSelfContext();
  const [toast, setToast] = useState("");

  const route = useRouter();

  const handleClickGoRegisterUser = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    route.push("/register-credentials");
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await schemaLoginUser.validate({
        email,
        password,
      });

      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        setLoading(false);
        setToast(response.error);
      } else {
        redirectTo(route);
      }
    } catch (validationError: any) {
      setLoading(false);
      setToast(validationError.message);
    }
  };

  return (
    <form className="flex flex-col justify-between h-full mb-2">
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      <div>
        <div className="mb-3">
          <Label labelHtmlFor="email">Email</Label>
          <Input
            text="Digite seu email."
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-2">
          <Label labelHtmlFor="password">Senha</Label>
          <Input
            text="Digite sua senha."
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="w-full mb-4 text-right font-secondary text-azulEscuro font-bold">
            Esqueci minha senha.
          </button>
        </div>
      </div>
      <div className="w-full">
        <Button text="Entrar" type="internalButton" onClick={handleSubmit} />
        <div className="flex items-center justify-center mt-[3%] gap-1">
          <p className="text-center font-secondary">Não tem conta? </p>
          <button
            type="button"
            className="text-azulEscuro font-secondary font-bold"
            onClick={handleClickGoRegisterUser}
          >
            Cadastre-se!
          </button>
        </div>
      </div>
    </form>
  );
}
