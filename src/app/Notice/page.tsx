import Button from "@/components/Button/Button";
import { Label } from "@/components/Label/Label";
import Petter from "@/components/Petter/Petter";

export default function Notice() {
  const namePetter = "Sr. Petter";
  return (
    <div className="flex flex-col items-center justify-around w-[90%] h-[70%]">
      <div className="flex flex-col items-center">
        <Petter />
        <h2 className="font-secondary text-center text-big">{`Seja bem vindo, ${namePetter}!`}</h2>
      </div>
      <div className="flex flex-col">
        <Label labelHtmlFor="checkbox">
          <div className="flex items-start gap-5">
            <input type="checkbox" className="mt-[6px]" />
            <p className="font-secondary mb-5">
              Siga as boas práticas da casa.
            </p>
          </div>
        </Label>
        <Label labelHtmlFor="checkbox">
          <div className="flex items-start gap-5">
            <input type="checkbox" className="mt-[6px]" />
            <p className="font-secondary mb-5">
              Seja um Petter real. Forneça apenas informações e imagens
              verdadeiras.
            </p>
          </div>
        </Label>
        <Label labelHtmlFor="checkbox">
          <div className="flex items-start gap-5">
            <input type="checkbox" className="mt-[6px]" />
            <p className="font-secondary mb-5">
              Não forneça informações pessoais a usuários suspeitos.
            </p>
          </div>
        </Label>
        <Label labelHtmlFor="checkbox">
          <div className="flex items-start gap-5">
            <input type="checkbox" className="mt-[6px]" />
            <p className="font-secondary mb-5">
              Respeite todos. Estamos todos em busca de boas amizades e
              experiências
            </p>
          </div>
        </Label>
        <Label labelHtmlFor="checkbox">
          <div className="flex items-start gap-5">
            <input type="checkbox" className="mt-[6px]" />
            <p className="font-secondary mb-5">
              Ajude a comunidade. Sempre denuncie maus comportamentos.
            </p>
          </div>
        </Label>
      </div>
      <div className="absolute bottom-[6%] w-[90%]">
        <Button text="Continuar" type="internalButton" />
      </div>
    </div>
  );
}
