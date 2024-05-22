import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function FormUserRegisterCredentials() {
  const router = useRouter();
  const [tutorName, setTutorName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClickGoOn = (event: { preventDefault: () => void }) => {
    event?.preventDefault();
    router.push("/register-user/register-infos");
  };

  const handleNameTutorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTutorName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTutorName(event.target.value);
  };

  return (
    <form
      className="h-full mb-6 mt-2 overflow-y-auto"
      onSubmit={handleClickGoOn}
    >
      <div className="overflow-y-auto" style={{ height: "82%" }}>
        <div className="mb-3">
          <Label labelHtmlFor="nome">Tutor do Petter</Label>
          <Input
            text="Nome do tutor."
            type="text"
            id="nome"
            autoComplete="text"
            onChange={handleNameTutorChange}
          />
        </div>
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
        <div className="mb-3">
          <Label labelHtmlFor="password">Senha</Label>
          <Input
            text="Digite sua senha."
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <Label labelHtmlFor="passwordRepeat">Confirmar senha</Label>
          <Input
            text="Repita a senha."
            type="password"
            id="passwordRepeat"
            autoComplete="current-password"
            onChange={handleConfirmPasswordChange}
          />
        </div>
      </div>
      <div className="absolute bottom-3 w-[90%]">
        <Label labelHtmlFor="checkbox">
          <div className="flex items-start justify-center gap-5">
            <input type="checkbox" className="mt-[6px]" />
            <p className="font-secondary mb-[3%]">
              Aceito as políticas de privacidade.
            </p>
          </div>
        </Label>
        <Button text="Cadastrar" type="internalButton" />
        <p className="mt-2 text-center font-secondary">
          Já possui conta?
          <button
            onClick={handleClickGoOn}
            className="text-azulEscuro font-secondary font-bold ml-2"
          >
            Entrar!
          </button>
        </p>
      </div>
    </form>
  );
}
