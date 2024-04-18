import { Label } from "@/components/Label/Label";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

export default function FormRegister() {
  return (
    <form className="h-full">
      <div
        className="overflow-y-auto"
        style={{ height: "calc(100% - 120px)" }}
      >
        <div className="mb-3">
          <Label labelHtmlFor="text">Nome do Petter</Label>
          <Input
            text="Digite o nome do Petter."
            type="text"
            id="nome"
            autoComplete="text"
          />
        </div>
        <div className="mb-3">
          <Label labelHtmlFor="email">Email</Label>
          <Input
            text="Digite seu email."
            type="email"
            id="email"
            autoComplete="email"
          />
        </div>
        <div className="mb-3">
          <Label labelHtmlFor="password">Senha</Label>
          <Input
            text="Digite sua senha."
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </div>
        <div>
          <Label labelHtmlFor="password">Confirmar senha</Label>
          <Input
            text="Repita a senha."
            type="password"
            id="passwordRepeat"
            autoComplete="current-password"
          />
        </div>
      </div>
      <div className="absolute bottom-[4vh] w-[90%]">
        <Button text="Entrar" type="internalButton" />
        <p className="mt-4 text-center font-secondary">
          Não tem conta?{" "}
          <span className="text-azulEscuro font-secondary font-bold">
            Cadastre-se!
          </span>
        </p>
      </div>
    </form>
  );
}
