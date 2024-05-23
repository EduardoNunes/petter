import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Select from "@/components/Select/Select";
import { useStepContext } from "@/context/useStepContext";
import { useState } from "react";

export default function FormUserRegisterData() {
  const { handleToAddCurrentStep } = useStepContext();
  const [selectedOption, setSelectOption] = useState("");

  return (
    <form className="h-[100%] mb-6 mt-2" onSubmit={handleToAddCurrentStep}>
      <div className="overflow-y-auto" style={{ height: "100% - [120px]" }}>
        <div className="mb-3">
          <Label labelHtmlFor="birth">Sua data de nascimento</Label>
          <Input text="" type="date" id="birth" autoComplete="date" />
        </div>
        <div className="mb-3">
          <Label labelHtmlFor="cep">CEP</Label>
          <Input
            text="Digite seu cep."
            type="text"
            id="cep"
            autoComplete="cep"
          />
        </div>
        <div className="flex mb-3">
          <div>
            <Label labelHtmlFor="gender">Gênero</Label>
            <Select
              selectedOption={selectedOption}
              handleSelectChange={(e) => setSelectOption(e.target.value)}
            />
          </div>
          {selectedOption === "option3" && (
            <Input
              text="Digite seu gênero."
              type="text"
              id="gender"
              autoComplete="gender"
            />
          )}
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
        <Button text="Continuar" type="internalButton" />
      </div>
    </form>
  );
}
