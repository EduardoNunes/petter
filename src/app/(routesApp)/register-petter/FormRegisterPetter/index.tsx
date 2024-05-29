import Button from "@/components/Button/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { ChangeEvent, useState } from "react";

export default function FormRegisterPetter() {
  const [checkNoData, setCheckNoData] = useState(false);
  const [petterName, setPetterName] = useState("");
  const [petterKind, setPetterKind] = useState("");
  const [petterBreed, setPetterBreed] = useState("");

  const handleNamePetterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPetterName(event.target.value);
  };

  const handleKindPetterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPetterKind(event.target.value);
  };

  const handleBreedPetterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPetterBreed(event.target.value);
  };

  const handleClickNoData = () => {
    setCheckNoData(!checkNoData);
  };

  return (
    <form className="w-full">
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
        <Label labelHtmlFor="kind-petter">Kind do Petter</Label>
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
        <div className="flex flex-col items-center w-[50%]">
          <Label labelHtmlFor="birth">Data de nascimento.</Label>
          <Input
            text=""
            type="date"
            id="petter-birth"
            autoComplete="date"
            /*  onChange={handleChangeData} */
          />
        </div>
        <div className="flex items-center w-[50%] h-[72px] pl-4">
          <CheckBox checked={checkNoData} onChange={handleClickNoData} />
          <p className="w-[90%] font-secondary ml-3">Não sei a data.</p>
        </div>
      </div>
      <div className="absolute bottom-4 w-[90%]">
        <Button text="Continuar" type="internalButton" />
      </div>
    </form>
  );
}
