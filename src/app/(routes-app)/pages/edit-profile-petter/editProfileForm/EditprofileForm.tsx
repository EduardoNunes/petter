import Button from "@/components/Button/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import errorResponse from "@/components/Error/ErrorResponse";
import MessageToast from "@/components/Error/MessageToast";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Loading from "@/components/Loading/Loading";
import TextArea from "@/components/TextArea/TextArea";
import { useSelfContext } from "@/context/selfContext";
import api from "@/server/api";
import { schemaEditPetterInfos } from "@/validation/schemaEditPetterInfos";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";

interface PetterInfo {
  id?: number;
  petterName?: string;
  petterBirth?: string;
  petterKind?: string;
  petterBreed?: string;
  petterGender?: string;
  profileImageFile?: File | string;
  descriptionBio?: string;
}

interface EditProfileFormProps {
  profileImageFile: File | null;
}

export default function EditProfileForm({
  profileImageFile,
}: EditProfileFormProps) {
  const { getSelf } = useSelfContext();
  const { data } = useQuery("self", getSelf);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState("");

  const router = useRouter();

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
      petterGender: name === "gender" ? value : prev.petterGender,
      [name]: value,
    }));
  };

  const handleTextChange = (text: string) => {
    setFormData((prev) => ({
      ...prev,
      descriptionBio: text,
    }));
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const session = await getSession();
    const user = session?.user.id;
    const token = session?.user.accessToken;

    const sendFormData = new FormData();

    try {
      await schemaEditPetterInfos.validate(
        {
          petterName: formData.petterName,
          petterKind: formData.petterKind,
          petterBreed: formData.petterBreed,
          petterBirth: formData.petterBirth,
          petterGender: formData.petterGender,
        },
        { abortEarly: false }
      );

      sendFormData.append("petterName", formData.petterName || "");
      sendFormData.append("petterKind", formData.petterKind || "");
      sendFormData.append("petterBreed", formData.petterBreed || "");
      sendFormData.append("petterBirth", formData.petterBirth || "");
      sendFormData.append("petterGender", formData.petterGender || "");

      if (profileImageFile) {
        sendFormData.append("profileImageFile", profileImageFile);
      }

      await api.patch(
        `/petter-infos/${user}/${data?.PetterInfo?.[0]?.id}/edit-profile-petter`,
        sendFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Informações atualizadas com sucesso!");
      router.push("/pages/user-profile");
    } catch (error: any) {
      const response = errorResponse(error);
      setIsLoading(false);
      setToast(response);
    }

    setIsLoading(false);
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
      {isLoading && <Loading />}
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      <div className="overflow-y-auto mb-3">
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
              <CheckBox
                checked={checkNoData}
                onChange={handleClickNoDataCheck}
              />
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

        <Label labelHtmlFor="petter-gender">Gênero do Petter.</Label>
        <div className="flex w-full justify-around mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="petterGender"
              value="Macho"
              onChange={handleInputChange}
              checked={formData.petterGender === "Macho"}
              style={{ width: "16px", height: "16px" }}
            />
            <p className="font-secondary">Macho</p>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="petterGender"
              value="Fêmea"
              onChange={handleInputChange}
              checked={formData.petterGender === "Fêmea"}
              style={{ width: "16px", height: "16px" }}
            />
            <p className="font-secondary">Fêmea</p>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="petterGender"
              value="Não sei"
              onChange={handleInputChange}
              checked={formData.petterGender === "Não sei"}
              style={{ width: "16px", height: "16px" }}
            />
            <p className="font-secondary">Não sei</p>
          </label>
        </div>

        <Label labelHtmlFor="descricao">Sobre o Petter</Label>
        <TextArea
          onTextChange={handleTextChange}
          value={formData.descriptionBio || ""}
          placeholder={"Fale sobre seu Petter"}
          height="200px"
        />
      </div>

      <Button text={"Salvar Alterações"} type={"internalButton"} />
    </form>
  );
}
