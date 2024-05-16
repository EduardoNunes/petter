import Button from "@/components/Button/Button";
import { Label } from "@/components/Label/Label";
import Petter from "@/components/Petter/PetterColorful";
import "./checkbox-style.css";

export default function Notice() {
  const namePetter = "Sr. Petter";
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="flex flex-col items-center justify-around w-[90%] h-[70%]">
        <div className="flex flex-col items-center">
          <Petter fontSize="extraLarge" />
          <h2 className="font-secondary text-center text-big mb-5">{`Seja bem vindo, ${namePetter}!`}</h2>
        </div>
        <div className="flex flex-col">
          <Label labelHtmlFor="checkbox">
            <div className="flex gap-5">
              <input type="checkbox" className="custom-checkbox mt-[6px]" />
              <p className="w-[90%] font-secondary mb-5">
                Siga as boas práticas da casa.
              </p>
            </div>
          </Label>
          <Label labelHtmlFor="checkbox">
            <div className="flex gap-5">
              <input type="checkbox" className="custom-checkbox mt-[6px]" />
              <p className="w-[90%] font-secondary mb-5">
                Seja um Petter real. Forneça apenas informações e imagens
                verdadeiras.
              </p>
            </div>
          </Label>
          <Label labelHtmlFor="checkbox">
            <div className="flex gap-5">
              <input type="checkbox" className="custom-checkbox mt-[6px]" />
              <p className="w-[90%] font-secondary mb-5">
                Não forneça informações pessoais a usuários suspeitos.
              </p>
            </div>
          </Label>
          <Label labelHtmlFor="checkbox">
            <div className="flex gap-5">
              <input type="checkbox" className="custom-checkbox mt-[6px]" />
              <p className="w-[90%] font-secondary mb-5">
                Respeite todos. Estamos todos em busca de boas amizades e boas
                experiências.
              </p>
            </div>
          </Label>
          <Label labelHtmlFor="checkbox">
            <div className="flex gap-5">
              <input type="checkbox" className="custom-checkbox mt-[6px]" />
              <p className="w-[90%] font-secondary mb-5">
                Ajude a comunidade. Sempre denuncie maus comportamentos.
              </p>
            </div>
          </Label>
        </div>
        <div className="absolute bottom-[6%] w-[90%]">
          <Button text="Continuar" type="internalButton" />
        </div>
      </div>
    </div>
  );
}
