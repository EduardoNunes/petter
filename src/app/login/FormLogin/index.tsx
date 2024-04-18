import { Label } from "@/components/Label/Label";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

export default function FormLogin() {
  return (
    <form>
      <Label labelHtmlFor="email">Email</Label>
      <Input
        text="Digite seu email."
        type="email"
        id="email"
        autoComplete="email"
      />
      <Label labelHtmlFor="password">Senha</Label>
      <Input
        text="Digite sua senha."
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <span className="font-secondary">Esqueci minha senha.</span>
      <Button text="Entrar" type="internalButton" />
      <span className="font-secondary">Não tem conta? Cadastre-se!</span>
    </form>
  );
}
