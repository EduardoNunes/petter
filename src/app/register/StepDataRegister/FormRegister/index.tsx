import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { useStepContext } from "@/context/useStepContext";
import { useRouter } from "next/navigation";

export default function FormRegister() {
  const { handleToAddCurrentStep } = useStepContext();
  const router = useRouter();

  const handleClickGoOn = (event: { preventDefault: () => void }) => {
    event?.preventDefault();
    router.push("login");
  };

  return (
    <form className="h-full" onSubmit={handleToAddCurrentStep}>
      <div className="overflow-y-auto" style={{ height: "calc(100% - 120px)" }}>
        <div className="mb-3">
          <Label labelHtmlFor="nome">Nome do Petter</Label>
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
          <Label labelHtmlFor="passwordRepeat">Confirmar senha</Label>
          <Input
            text="Repita a senha."
            type="password"
            id="passwordRepeat"
            autoComplete="current-password"
          />
        </div>
      </div>
      <div className="absolute bottom-[4vh] w-[90%]">
        <Label labelHtmlFor="checkbox">
          <div className="flex items-start justify-center gap-5">
            <input type="checkbox" className="mt-[6px]" />
            <p className="font-secondary mb-[3%]">
              Aceito as políticas de privacidade.
            </p>
          </div>
        </Label>
        <Button text="Cadastrar" type="internalButton" />
        <p className="mt-4 text-center font-secondary">
          Já possui conta?{" "}
          <button
            onClick={handleClickGoOn}
            className="text-azulEscuro font-secondary font-bold"
          >
            {" "}
            Entrar!
          </button>
        </p>
      </div>
    </form>
  );
}
