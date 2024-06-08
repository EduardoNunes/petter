import Button from "@/components/Button/Button";
import ErrorWindow from "@/components/Error/ErrorWindown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Loading from "@/components/Loading/Loading";
import Select from "@/components/Select/Select";
import api from "@/server/api";
import viaCep from "@/server/api-viacep";
import formatCep from "@/utils/formatCep";
import formatPhone from "@/utils/formatPhone";
import { schemaRegisterInfosUser } from "@/validation/schemaRegisterInfosUser";
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import AddressInfos from "./AddressInfos/AddressInfos";

export default function FormUserRegisterData() {
  const router = useRouter();
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
  const [error, setError] = useState("");
  const [showAddressInfos, setShowAddressInfos] = useState(false);
  const [loading, setLoading] = useState(false);
  const userEmail = localStorage.getItem("email");

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    try {
      setLoading(true);

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

      const response = await api.post("/user-register-infos", {
        email: userEmail,
        date,
        gender,
        phone,
        cep,
        neighborhood,
        ddd,
        locality,
        publicPlace,
        uf,
      });

      if ((await response).status === 201) {
        router.push("/notice");
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
    }
  }

  const handleChangeData = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleTypeGender = (event: ChangeEvent<HTMLInputElement>) => {

    setGender(event.target.value);
  };

  const handleTypePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const newPhone = event.target.value;

    formatPhone(newPhone, setPhone);
  };

  useEffect(() => {
    const fetchAddress = async () => {
      if (cep.length === 9) {
        try {
          const response = await viaCep(cep.replace(/\D/g, ""));

          console.log("response", response || "");
          setNeighborhood(response.neighborhood || "");
          setDdd(response.ddd || "");
          setLocality(response.locality || "");
          setPublicPlace(response.publicPlace || "");
          setUf(response.uf || "");
          setShowAddressInfos(true);
        } catch (error) {
          console.error("Erro ao obter dados do CEP:", error);
        }
      }
    };
    fetchAddress();
  }, [cep]);

  const handleChangeAddress = async (event: ChangeEvent<HTMLInputElement>) => {
    const newCep = event.target.value;
    if (newCep.length <= 9) {
      formatCep(newCep, setCep);
    }
  };

  return (
    <form className="h-[100%] mb-6 mt-2" onSubmit={onSubmit}>
      {error && <ErrorWindow textError={error} setError={setError} />}
      {loading && <Loading />}
      <div className="overflow-hidden" style={{ height: "100% - [120px]" }}>
        <div className="mb-2">
          <Label labelHtmlFor="birth">Sua data de nascimento</Label>
          <Input
            text=""
            type="date"
            id="birth"
            autoComplete="date"
            onChange={handleChangeData}
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
                  setGender("")
                }
              }}
            />
          </div>
          {selectedOption === "outro" && (
            <Input
              text="Digite seu gênero."
              type="text"
              id="gender"
              autoComplete="gender"
              value={gender}
              onChange={handleTypeGender}
            />
          )}
        </div>
        <div className="mb-2">
          <Label labelHtmlFor="tel">Número de telefone</Label>
          <Input
            text="Informe seu número de celular."
            type="tel"
            id="tel"
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
