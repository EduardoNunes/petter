"use client";

import Button from "@/components/Button/Button";
import ErrorWindow from "@/components/Error/ErrorWindown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Loading from "@/components/Loading/Loading";
import api from "@/server/api";
import { schemaLoginUser } from "@/validation/schemaLoginUser";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function FormLogin() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClickGoRegisterUser = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    router.push("/register-user/register-credentials");
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await schemaLoginUser.validate(
        {
          email,
          password,
        },
        { abortEarly: false }
      );

      const response = await api.post("/auth/login", {
        email,
        password,
      });

        const { accessToken, userId } = response.data;
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", accessToken);
        console.log('DATAS', userId, accessToken);
        //Ir para home se já houver petter
        router.push("/post"); 

    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else if (error.errors && error.errors.length > 0) {
        setError(error.errors[0]);
      } else {
        setError(error.message || "Ocorreu um erro.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <form>
      {loading && <Loading />}
      {error && <ErrorWindow textError={error} setError={setError} />}
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
        <button className="w-full mt-2 mb-8 text-right font-secondary text-azulEscuro font-bold">
          Esqueci minha senha.
        </button>
      </div>
      <div className="absolute bottom-[4vh] w-[90%]">
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
