import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import TextArea from "@/components/TextArea/TextArea";
import { useEffect, useState } from "react";
import api from "@/server/api";
import { useSelfContext } from "@/context/selfContext";
import { useQuery } from "react-query";
import CheckBox from "@/components/CheckBox/CheckBox";

interface PetterInfo {
  id?: number;
  petterName?: string;
  petterBirth?: string;
  petterKind?: string;
  petterBreed?: string;
  petterGender?: string;
  descriptionBio?: string;
}

export default function EditProfileForm() {
  const { getSelf } = useSelfContext();
  const { data } = useQuery("self", getSelf);

  const initialPetterBirth =
    data?.PetterInfo?.[0]?.petterBirth === "Não sei a data."
      ? "Não sei a data."
      : data?.PetterInfo?.[0]?.petterBirth || "";

  const [formData, setFormData] = useState<PetterInfo>({
    petterName: data?.PetterInfo?.[0]?.petterName || "",
    petterBirth: initialPetterBirth,
    petterKind: data?.PetterInfo?.[0]?.petterKind || "",
    petterBreed: data?.PetterInfo?.[0]?.petterBreed || "",
    petterGender: data?.PetterInfo?.[0]?.petterGender || "",
    descriptionBio: data?.PetterInfo?.[0]?.descriptionBio || "",
  });

  const [checkNoData, setCheckNoData] = useState(
    initialPetterBirth === "Não sei a data."
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextChange = (text: string) => {
    setFormData((prev) => ({
      ...prev,
      descriptionBio: text,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await api.put(`/petter-infos/${data?.PetterInfo?.[0]?.id}`, formData);
      console.log("Informações atualizadas com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar as informações:", error);
    }
  };

  const handleClickNoDataCheck = () => {
    setCheckNoData((prev) => !prev);
    setFormData((prev) => ({
      ...prev,
      petterBirth: !checkNoData ? "Não sei a data." : "",
    }));
  };

  return (
    <form onSubmit={handleSaveChanges}>
      <Label labelHtmlFor="nome">Nome do Petter</Label>
      <Input
        text="Digite o nome do Petter."
        type="text"
        id="nome"
        name="petterName"
        autoComplete="name"
        value={formData.petterName}
        onChange={handleInputChange}
        style="mb-4"
      />

      <div>
        <Label labelHtmlFor="nascimentoPetter">
          Data de nascimento do Petter
        </Label>
        <div className="flex items-center">
          <div
            className={`flex flex-col items-center w-[50%] mb-2 mt-1 ${
              checkNoData ? "opacity-25" : ""
            }`}
          >
            <Input
              text="Digite a data de nascimento do Petter."
              type="date"
              id="petter-birth"
              name="petterBirth"
              autoComplete="birth"
              value={checkNoData ? "" : formData.petterBirth}
              onChange={handleInputChange}
              disabled={checkNoData}
            />
          </div>
          <div className="flex items-center w-[50%] pl-4 mb-2">
            <CheckBox checked={checkNoData} onChange={handleClickNoDataCheck} />
            <p className="w-[90%] font-secondary ml-3">Não sei a data.</p>
          </div>
        </div>
      </div>

      <Label labelHtmlFor="tipo">Tipo do Petter</Label>
      <Input
        text="Digite o tipo do Petter."
        type="text"
        id="tipo"
        name="petterKind"
        autoComplete="kind"
        value={formData.petterKind}
        onChange={handleInputChange}
      />

      <Label labelHtmlFor="race">Raça</Label>
      <Input
        text="Digite a raça do Petter."
        type="text"
        id="race"
        name="petterBreed"
        autoComplete="race"
        value={formData.petterBreed}
        onChange={handleInputChange}
        style={"mb-4"}
      />

      <Label labelHtmlFor="genero">Gênero</Label>
      <select
        id="genero"
        name="petterGender"
        value={formData.petterGender}
        onChange={handleInputChange}
        className="font-secondary mb-4"
      >
        <option value="" className="font-secondary">
          Selecione o gênero
        </option>
        <option value="Macho" className="font-secondary">
          Macho
        </option>
        <option value="Fêmea" className="font-secondary">
          Fêmea
        </option>
      </select>

      <Label labelHtmlFor="descricao">Sobre o Petter</Label>
      <TextArea
        onTextChange={handleTextChange}
        value={formData.descriptionBio || ""}
        placeholder={"Fale sobre seu Petter"}
        height="44%"
      />

      <button type="submit">Salvar Alterações</button>
    </form>
  );
}
