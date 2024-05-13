import { Label } from "@/components/Label/Label";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Link from "next/link";

export default function FormLogin() {
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
        <p className="mt-4 text-center font-secondary">
          Não tem conta?{" "}         
            <Link
              href="/register"
              className="text-azulEscuro font-secondary font-bold"
            >
              Cadastre-se!
            </Link>
        </p>
      </div>
    </form>
  );
}
