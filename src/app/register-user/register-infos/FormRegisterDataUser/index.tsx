import Button from "@/components/Button/Button";
import ErrorWindow from "@/components/Error/ErrorWindown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Select from "@/components/Select/Select";
import { useStepContext } from "@/context/useStepContext";
import viaCep from "@/server/api-viacep";
import formatCep from "@/utils/formatCEP";

import { schemaRegisterInfosUser } from "@/validation/schemaRegisterInfosUser";
import { ChangeEvent, useEffect, useState } from "react";

export default function FormUserRegisterData() {
  const { handleToAddCurrentStep } = useStepContext();
  const [selectedOption, setSelectOption] = useState("");
  const [date, setDate] = useState("");
  const [cep, setCep] = useState("");
  const [addressFrom, setAddressForm] = useState("");
  const [error, setError] = useState("");

  const handleChangeData = async (event: ChangeEvent<HTMLInputElement>) => {
    const newData = event.target.value;
    try {
      await schemaRegisterInfosUser.validate({ date: newData });
      setDate(newData);
    } catch (validationError: any) {
      setError(validationError.errors[0]);
      console.log("ERROR", validationError.errors[0]);
    }
  };

  const handleChangeAddress = async (event: ChangeEvent<HTMLInputElement>) => {
    const newCep = event.target.value;
    if (newCep.length <= 9) {
      formatCep(newCep, setCep);
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      if (cep.length === 9) {
        try {
          const response = await viaCep(cep.replace(/\D/g, ""));

          console.log("response", response);
        } catch (error) {
          console.error("Erro ao obter dados do CEP:", error);
        }
      }
    };
    fetchAddress();
  }, [cep]);

  return (
    <form className="h-[100%] mb-6 mt-2" onSubmit={handleToAddCurrentStep}>
      {error && <ErrorWindow textError={error} setError={setError} />}
      <div className="overflow-y-auto" style={{ height: "100% - [120px]" }}>
        <div className="mb-3">
          <Label labelHtmlFor="birth">Sua data de nascimento</Label>
          <Input
            text=""
            type="date"
            id="birth"
            autoComplete="date"
            onChange={handleChangeData}
          />
        </div>
        <div className="mb-3">
          <Label labelHtmlFor="cep">CEP</Label>
          <Input
            text="Digite seu cep."
            type="text"
            id="cep"
            autoComplete="cep"
            value={cep}
            onChange={handleChangeAddress}
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
        {/*         <div>
          <Label labelHtmlFor="passwordRepeat">Confirmar senha</Label>
          <Input
            text="Repita a senha."
            type="password"
            id="passwordRepeat"
            autoComplete="current-password"
          />
        </div> */}
      </div>
      <div className="absolute bottom-2 w-[90%]">
        <Button text="Continuar" type="internalButton" />
      </div>
    </form>
  );
}
