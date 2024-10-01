import Button from "@/components/Button/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import errorResponse from "@/components/Error/ErrorResponse";
import MessageToast from "@/components/Error/MessageToast";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { useSelfContext } from "@/context/selfContext";
import api from "@/server/api";
import { schemaRegisterPetterInfos } from "@/validation/schemaRegisterPetterInfos";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { SyntheticEvent, useEffect, useState } from "react";

export default function FormRegisterPetter() {
  const [checkNoData, setCheckNoData] = useState(false);
  const [petterName, setPetterName] = useState("");
  const [petterKind, setPetterKind] = useState("");
  const [petterBreed, setPetterBreed] = useState("");
  const [petterBirth, setPetterBirth] = useState("");
  const [petterGender, setPetterGender] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState("");
  const { setLoading } = useSelfContext();
  const [toast, setToast] = useState("");

  const route = useRouter();

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setLoading(true);
    const session = await getSession();

    if (!session) {
      console.log("Erro de session rpri, entre em contato com o suporte");
      return;
    }

    const token = session?.user.accessToken;
    const email = session?.user.email;

    if (!email) {
      setToast("Erro de email rpri, entre em contato com o suporte");
      return;
    }

    try {
      const formData = new FormData();

      await schemaRegisterPetterInfos.validate(
        {
          petterName,
          petterKind,
          petterBreed,
          petterBirth,
          petterGender,
          profileImageFile,
        },
        { abortEarly: false }
      );

      formData.append("email", email);
      formData.append("petterName", petterName);
      formData.append("petterKind", petterKind);
      formData.append("petterBreed", petterBreed);
      formData.append("petterBirth", petterBirth);
      formData.append("petterGender", petterGender);

      if (profileImageFile) {
        formData.append("profileImageFile", profileImageFile);
      } else {
        setToast(`Imagem inválida: ${profileImageFile}`);
        setLoading(false);
        return;
      }

      await api.post("petter-infos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setToast("Sucesso");
      route.replace("/registers/register-petter/load-images");
    } catch (error: any) {
      const response = errorResponse(error);
      setLoading(false);
      setToast(response);
    }
    setLoading(false);
  }

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
    <form
      className="flex flex-col justify-between w-full"
      style={{ height: "calc(100% - 60px)" }}
      onSubmit={onSubmit}
    >
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      <div>
        <div className="mb-3">
          <Label labelHtmlFor="petter-name">Nome do Petter</Label>
          <Input
            text="Nome do Petter."
            type="text"
            id="petter-name"
            name="petterName"
            autoComplete="text"
            onChange={(event) => setPetterName(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <Label labelHtmlFor="petter-kind">Tipo do Petter</Label>
          <Input
            text="Ex: Cachorro, Gato."
            type="text"
            id="petter-kind"
            name="petterKind"
            autoComplete="text"
            onChange={(event) => setPetterKind(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <Label labelHtmlFor="petter-breed">Raça</Label>
          <Input
            text="Ex: Labrador, Golden, Siamês."
            type="text"
            id="petter-breed"
            name="petterBreed"
            autoComplete="text"
            onChange={(event) => setPetterBreed(event.target.value)}
          />
        </div>
        <Label labelHtmlFor="petter-gender">Gênero do Petter.</Label>
        <div className="flex w-full justify-around mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="Macho"
              onChange={(event) => setPetterGender(event.target.value)}
              checked={petterGender === "Macho"}
              style={{ width: "16px", height: "16px" }}
            />
            <p className="font-secondary">Macho</p>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="Fêmea"
              onChange={(event) => setPetterGender(event.target.value)}
              checked={petterGender === "Fêmea"}
              style={{ width: "16px", height: "16px" }}
            />
            <p className="font-secondary">Fêmea</p>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="Não sei"
              onChange={(event) => setPetterGender(event.target.value)}
              checked={petterGender === "Não sei"}
              style={{ width: "16px", height: "16px" }}
            />
            <p className="font-secondary">Não sei</p>
          </label>
        </div>
        <div className="flex mb-2">
          <div
            className={`flex flex-col items-center w-[50%] ${
              checkNoData ? "opacity-25" : ""
            }`}
          >
            <Label labelHtmlFor="petter-birth">Data de nascimento.</Label>
            <Input
              text=""
              type="date"
              id="petter-birth"
              name="petterBirth"
              autoComplete="date"
              onChange={(event) => setPetterBirth(event.target.value)}
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
            className="flex items-center justify-center w-full cursor-pointer h-10 rounded-3xl bg-azulPalido mb-4"
          >
            <span className="flex items-center h-10 font-secondary font-bold">
              Selecionar a imagem do perfil
            </span>
            <input
              id="fileInput"
              type="file"
              className="block w-0 h-0 font-secondary"
              name="images"
              onChange={uploadImage}
              multiple
              accept=".jpg, .jpeg, .png"
              capture="user"
            />
          </label>
        </div>
        <div className="flex justify-center w-full mb-4">
          {profileImageFile && (
            <Image
              src={profileUrl}
              width={150}
              height={150}
              alt="Profile Image"
              className="object-cover w-24 h-24 rounded-full border-lime-950 border-solid border-[3px]"
            />
          )}
        </div>
      </div>
      <div className="w-full">
        <Button text="Continuar" type="internalButton" />
      </div>
    </form>
  );
}
