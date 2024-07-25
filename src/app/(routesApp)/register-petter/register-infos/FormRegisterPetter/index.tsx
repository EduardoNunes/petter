import Button from "@/components/Button/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import ErrorWindow from "@/components/Error/ErrorWindown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Loading from "@/components/Loading/Loading";
import api from "@/server/api";
import { schemaRegisterPetterInfos } from "@/validation/schemaRegisterPetterInfos";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

export default function FormRegisterPetter() {
  const [checkNoData, setCheckNoData] = useState(false);
  const [petterName, setPetterName] = useState("");
  const [petterKind, setPetterKind] = useState("");
  const [petterBreed, setPetterBreed] = useState("");
  const [petterBirth, setPetterBirth] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const route = useRouter();

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      await schemaRegisterPetterInfos.validate(
        {
          petterName,
          petterKind,
          petterBreed,
          petterBirth,
        },
        { abortEarly: false }
      );

      formData.append("petterName", petterName);
      formData.append("petterKind", petterKind);
      formData.append("petterBreed", petterBreed);
      formData.append("petterBirth", petterBirth);

      if (profileImageFile) {
        formData.append("profileImageFile", profileImageFile);
      } else {
        console.error("Invalid image type:", profileImageFile);
      }

      const response = await api.post("petter-infos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("petterId", (await response).data.id);
      localStorage.setItem("petterName", (await response).data.petterName);
      route.push("/register-petter/load-images");
      setLoading(false);
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
      setLoading(false);
    }
    setLoading(false);
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

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfileImageFile(file);
      const url = URL.createObjectURL(file);
      setProfileUrl(url);
    }
  };

  return (
    <form className="h-[84%] overflow-auto w-full" onSubmit={onSubmit}>
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
      <div className="flex mt-6">
        <label
          htmlFor="fileInput"
          className="flex items-center justify-center w-full cursor-pointer h-10 rounded-3xl bg-azulPalido mb-[6%]"
        >
          <span className="flex items-center h-10 font-secondary font-bold">
            Selecionar imagem de perfil
          </span>
          <input
            id="fileInput"
            type="file"
            className="block w-0 h-0 font-secondary"
            name="images"
            onChange={uploadImage}
            multiple
            accept=".jpg, .jpeg"
            capture="user"
          />
        </label>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-24 h-24 mb-10">
          {profileImageFile && (
            <Image
              src={profileUrl}
              width={150}
              height={150}
              alt="Profile Image"
              className="object-cover w-full h-full rounded-full border-lime-950 border-solid border-[3px]"
            />
          )}
        </div>
      </div>
      <div className="absolute bottom-4 w-[90%]">
        <Button text="Continuar" type="internalButton" />
      </div>
    </form>
  );
}
