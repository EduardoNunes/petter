import Button from "@/components/Button/Button";
import ErrorWindow from "@/components/Error/ErrorWindown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Loading from "@/components/Loading/Loading";
import Select from "@/components/Select/Select";
import { useStepContext } from "@/context/useStepContext";
import api from "@/server/api";
import viaCep from "@/server/api-viacep";
import formatCep from "@/utils/formatCEP";

import { schemaRegisterInfosUser } from "@/validation/schemaRegisterInfosUser";
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

export default function FormUserRegisterData() {
  const router = useRouter();
  const [selectedOption, setSelectOption] = useState("");
  const [date, setDate] = useState("");
  const [cep, setCep] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleClickGoOn(event: SyntheticEvent) {
    event.preventDefault();

    try {
      setLoading(true);

      await schemaRegisterInfosUser.validate(
        {
          date,
          cep,
          gender,
        },
        { abortEarly: false }
      );

      const response = await api.post("/users-register-infos", {
        date,
        cep,
        gender,
      });

      console.log((await response).status, "RESPONSE");

      if ((await response).status === 201) {
        router.push("");
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else if (error.errors && error.errors.length > 0) {
        setError(error.errors[0]);
      } else {
        setError(error.message || "Ocorreu um erro.");
      }
    } finally {
      setLoading(false);
    }
  }

  const handleChangeData = async (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
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
    <form className="h-[100%] mb-6 mt-2" onSubmit={handleClickGoOn}>
      {error && <ErrorWindow textError={error} setError={setError} />}
      {loading && <Loading />}
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
