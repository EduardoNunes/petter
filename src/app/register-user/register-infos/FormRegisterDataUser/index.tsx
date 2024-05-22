import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { useStepContext } from "@/context/useStepContext";

export default function FormUserRegisterData() {
  const { handleToAddCurrentStep } = useStepContext();

  return (
    <form className="h-full mb-6 mt-2" onSubmit={handleToAddCurrentStep}>
      <div className="overflow-y-auto" style={{ height: "calc(100% - 120px)" }}>
        <div className="mb-3">
          <Label labelHtmlFor="nome">Tutor do Petter</Label>
          <Input
            text="Nome do tutor."
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
      <div className="absolute bottom-2 w-[90%]">
        <Label labelHtmlFor="checkbox">
          <div className="flex items-start justify-center gap-5">
            <input type="checkbox" className="mt-[6px]" />
            <p className="font-secondary mb-[3%]">
              Aceito as políticas de privacidade.
            </p>
          </div>
        </Label>
        <Button text="Continuar" type="internalButton" />
      </div>
    </form>
  );
}
