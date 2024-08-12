import Button from "@/components/Button/Button";
import errorResponse from "@/components/Error/ErrorResponse";
import MessageToast from "@/components/Error/MessageToast";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Loading from "@/components/Loading/Loading";
import Select from "@/components/Select/Select";
import api from "@/server/api";
import viaCep from "@/server/api-viacep";
import formatCep from "@/utils/formatCep";
import formatPhone from "@/utils/formatPhone";
import { schemaRegisterInfosUser } from "@/validation/schemaRegisterInfosUser";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import AddressInfos from "./AddressInfos/AddressInfos";

export default function FormUserRegisterData() {
  const [selectedOption, setSelectOption] = useState("");
  const [date, setDate] = useState("");
  const [cep, setCep] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [ddd, setDdd] = useState("");
  const [locality, setLocality] = useState("");
  const [publicPlace, setPublicPlace] = useState("");
  const [uf, setUf] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [toast, setToast] = useState("");
  const [showAddressInfos, setShowAddressInfos] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      const session = await getSession();
      const token = session?.user.accessToken;
      const email = session?.user.email;

      await schemaRegisterInfosUser.validate(
        {
          date,
          gender: selectedOption === "outro" ? gender : selectedOption,
          phone,
          cep,
          neighborhood,
          ddd,
          locality,
          publicPlace,
          uf,
        },
        { abortEarly: false }
      );

      await api.post(
        "/user-infos",
        {
          email,
          date,
          gender,
          phone,
          cep,
          neighborhood,
          ddd,
          locality,
          publicPlace,
          uf,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setToast("Informações cadastradas com sucesso.");
      router.push("/pages/notice");
    } catch (error: any) {
      const response = errorResponse(error);
      setToast(response);
    }

    setLoading(false);
  }

  const handleTypePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const newPhone = event.target.value;

    formatPhone(newPhone, setPhone);
  };

  useEffect(() => {
    setLoading(true);
    const fetchAddress = async () => {
      if (cep.length === 9) {
        try {
          const response = await viaCep(cep.replace(/\D/g, ""));

          setNeighborhood(response.neighborhood || "");
          setDdd(response.ddd || "");
          setLocality(response.locality || "");
          setPublicPlace(response.publicPlace || "");
          setUf(response.uf || "");
          setShowAddressInfos(true);
        } catch (error) {
          setLoading(false);
          setToast("CEP não encontrado:");
        }
      }
      setLoading(false);
    };

    fetchAddress();
  }, [cep]);

  const handleChangeAddress = async (event: ChangeEvent<HTMLInputElement>) => {
    const newCep = event.target.value;
    if (newCep.length <= 9) {
      setCep(formatCep(newCep));
    }
  };

  return (
    <form className="h-[100%] mb-6 mt-2" onSubmit={onSubmit}>
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      {loading && <Loading />}
      <div className="overflow-hidden" style={{ height: "100% - [120px]" }}>
        <div className="mb-2">
          <Label labelHtmlFor="birth">Sua data de nascimento</Label>
          <Input
            text=""
            type="date"
            id="birth"
            name="birth"
            autoComplete="date"
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div className="flex mb-2">
          <div>
            <Label labelHtmlFor="gender">Gênero</Label>
            <Select
              selectedOption={selectedOption}
              option1="masculino"
              option2="feminino"
              option3="outro"
              option4="prefiro não informar"
              handleSelectChange={(e) => {
                setSelectOption(e.target.value);
                if (e.target.value !== "outro") {
                  setGender(e.target.value);
                } else {
                  setGender("");
                }
              }}
            />
          </div>
          {selectedOption === "outro" && (
            <Input
              text="Digite seu gênero."
              type="text"
              id="gender"
              name="gender"
              autoComplete="gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            />
          )}
        </div>
        <div className="mb-2">
          <Label labelHtmlFor="tel">Número de celular</Label>
          <Input
            text="Informe seu número de celular."
            type="tel"
            id="tel"
            name="tel"
            autoComplete="tel"
            value={phone}
            onChange={handleTypePhone}
          />
        </div>
        <div className="h-[24vh]">
          <Label labelHtmlFor="cep">CEP</Label>
          <Input
            text="Digite seu cep."
            type="text"
            id="cep"
            name="cep"
            autoComplete="cep"
            value={cep}
            onChange={handleChangeAddress}
          />
          {showAddressInfos && (
            <AddressInfos
              neighborhood={neighborhood}
              ddd={ddd}
              locality={locality}
              publicPlace={publicPlace}
              uf={uf}
            />
          )}
        </div>
      </div>
      <div className="absolute bottom-2 w-[90%]">
        <Button text="Continuar" type="internalButton" />
      </div>
    </form>
  );
}
