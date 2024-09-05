import Button from "@/components/Button/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import errorResponse from "@/components/Error/ErrorResponse";
import MessageToast from "@/components/Error/MessageToast";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Loading from "@/components/Loading/Loading";
import { useSelfContext } from "@/context/selfContext";
import api from "@/server/api";
import { schemaRegisterCredentialsUser } from "@/validation/schemaRegisterCredentialsUser";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function FormUserRegisterCredentials() {
  const [tutorName, setTutorName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState("");
  const { setLoading } = useSelfContext();
  const [privacyPolicies, setPrivacyPolicies] = useState(false);

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);

      await schemaRegisterCredentialsUser.validate(
        {
          name: tutorName,
          email,
          password,
          confirmPassword,
        },
        { abortEarly: false }
      );

      if (!privacyPolicies) {
        setToast(
          "Para prosseguirmos, você deve concordar com as políticas de privacidade"
        );
        return;
      }

      await api.post("/users-credentials", {
        name: tutorName,
        email,
        password,
        loggedBy: "credentials",
      });

      console.log("Informações registradas com sucesso");

      setToast(
        "Cadastro realizado com sucesso. Direcionando para página de login."
      );

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error: any) {
      setLoading(false);
      const response = errorResponse(error);
      setToast(response);
    }

    setLoading(false);
  }

  const handleClickGoToLogin = (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    router.push("/login");
  };

  return (
    <form
      className="flex flex-col justify-between h-full my-2"
      onSubmit={handleSubmit}
    >
      {toast !== "" && <MessageToast textError={toast} setToast={setToast} />}
      <div className="">
        <div className="mb-3">
          <Label labelHtmlFor="tutor-name">Tutor do Petter</Label>
          <Input
            text="Nome do tutor."
            type="text"
            id="tutor-name"
            name="tutor"
            autoComplete="text"
            onChange={(event) => setTutorName(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <Label labelHtmlFor="email">Email</Label>
          <Input
            text="Digite seu email."
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <Label labelHtmlFor="password">Senha</Label>
          <Input
            text="Digite sua senha."
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <Label labelHtmlFor="passwordRepeat">Confirmar senha</Label>
          <Input
            text="Repita a senha."
            type="password"
            id="passwordRepeat"
            name="passwordRepeat"
            autoComplete="current-password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
      </div>
      <div className="mt-4">
        <Label labelHtmlFor="checkbox">
          <div className="flex items-start justify-center gap-5">
            <CheckBox
              checked={privacyPolicies}
              onChange={() => setPrivacyPolicies(!privacyPolicies)}
            />
            <p className="font-secondary mb-2">
              Aceito todas as políticas de uso.
            </p>
          </div>
        </Label>
        <Button text="Cadastrar" type="internalButton" />
        <p className="mt-2 text-center font-secondary">
          Já possui conta?
          <button
            onClick={handleClickGoToLogin}
            className="text-azulEscuro font-secondary font-bold ml-2"
          >
            Entrar!
          </button>
        </p>
      </div>
    </form>
  );
}
