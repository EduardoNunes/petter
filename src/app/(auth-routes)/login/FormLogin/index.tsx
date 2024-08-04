"use client";

import Button from "@/components/Button/Button";
import ErrorWindow from "@/components/Error/ErrorWindown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Loading from "@/components/Loading/Loading";
import { setItem } from "@/utils/localStorageUtils";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function FormLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

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

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    const session = await getSession();
    const user = session?.user;

    console.log("USER AQUI", user);

    if (user) {
      setItem("token", user.accessToken);
      console.log("0");
      if (!user.userInfo) {
        console.log("1");
        router.push("/register-infos");
      } else if (user.petterInfo.length === 0) {
        console.log("2");
        router.push("/notice");
      } else {
        console.log("3");
        router.push("/home");
      }
    } else {
      setLoading(false);
    }

    /* try {
      await schemaLoginUser.validate(
        {
          email,
          password,
        },
        { abortEarly: false }
      ); */
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
          name="email"
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
          name="password"
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
