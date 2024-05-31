import Button from "@/components/Button/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import ErrorWindow from "@/components/Error/ErrorWindown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Loading from "@/components/Loading/Loading";
import api from "@/server/api";
import { schemaRegisterPetterInfos } from "@/validation/schemaRegisterPetterInfos";
import { useRouter } from "next/navigation";

import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

export default function FormRegisterPetter() {
  const [checkNoData, setCheckNoData] = useState(false);
  const [petterName, setPetterName] = useState("");
  const [petterKind, setPetterKind] = useState("");
  const [petterBreed, setPetterBreed] = useState("");
  const [petterBirth, setPetterBirth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const route = useRouter();

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    try {
      setLoading(true);

      await schemaRegisterPetterInfos.validate(
        {
          petterName,
          petterKind,
          petterBreed,
          petterBirth,
        },
        { abortEarly: false }
      );

      const response = await api.post("petter-register-infos", {
        petterName,
        petterKind,
        petterBreed,
        petterBirth,
      });

      console.log((await response).status, "RESPONSE");
      route.push("")
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

  const handleNamePetterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPetterName(event.target.value);
  };

  const handleKindPetterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPetterKind(event.target.value);
  };

  const handleBreedPetterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPetterBreed(event.target.value);
  };

  const handleBirthPetterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPetterBirth(event.target.value);
  };

  const handleClickNoDataCheck = () => {
    setCheckNoData(!checkNoData);
  };

  useEffect(() => {
    checkNoData ? setPetterBirth("Não sei a data.") : setPetterBirth("");
  }, [checkNoData]);

  return (
    <form className="w-full" onSubmit={onSubmit}>
      {error && <ErrorWindow textError={error} setError={setError} />}
      {loading && <Loading />}
      <div className="mb-3">
        <Label labelHtmlFor="petter-name">Nome do Petter</Label>
        <Input
          text="Nome do Petter."
          type="text"
          id="petter-name"
          autoComplete="text"
          onChange={handleNamePetterChange}
        />
      </div>
      <div className="mb-3">
        <Label labelHtmlFor="kind-petter">Tipo do Petter</Label>
        <Input
          text="Ex: Cachorro, Gato."
          type="text"
          id="petter-name"
          autoComplete="text"
          onChange={handleKindPetterChange}
        />
      </div>
      <div className="mb-3">
        <Label labelHtmlFor="breed-petter">Raça</Label>
        <Input
          text="Ex: Labrador, Golden, Siamês."
          type="text"
          id="petter-breed"
          autoComplete="text"
          onChange={handleBreedPetterChange}
        />
      </div>
      <div className="flex mb-2">
        <div
          className={`flex flex-col items-center w-[50%] ${
            checkNoData ? "opacity-25" : ""
          }`}
        >
          <Label labelHtmlFor="birth">Data de nascimento.</Label>
          <Input
            text=""
            type="date"
            id="petter-birth"
            autoComplete="date"
            onChange={handleBirthPetterChange}
            disabled={checkNoData}
          />
        </div>
        <div className="flex items-center w-[50%] h-[72px] pl-4">
          <CheckBox checked={checkNoData} onChange={handleClickNoDataCheck} />
          <p className="w-[90%] font-secondary ml-3">Não sei a data.</p>
        </div>
      </div>
      <div className="absolute bottom-4 w-[90%]">
        <Button text="Continuar" type="internalButton" />
      </div>
    </form>
  );
}
