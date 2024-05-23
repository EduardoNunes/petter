import Button from "@/components/Button/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import ErrorWindow from "@/components/Error/ErrorWindown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Loading from "@/components/Loading/Loading";
import api from "@/server/api";
import { schemaRegisterCredentialsUser } from "@/validation/schemaRegisterCredentialsUser";
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";

export default function FormUserRegisterCredentials() {
  const router = useRouter();
  const [tutorName, setTutorName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [privacyPolicies, setPrivacyPolicies] = useState(false);

  async function handleClickGoOn(event: SyntheticEvent) {
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
        setError(
          "Para prosseguirmos, você deve concordar com as políticas de privacidade"
        );
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }

      const response = await api.post("/users-register-credentials", {
        name: tutorName,
        email,
        password,
        profileImage,
      });

      console.log((await response).status, "RESPONSE");

      if ((await response).status === 201) {
        router.push("/register-user/register-infos");
      }
    } catch (error: any) {
      if (error.errors && error.errors.length > 0) {
        setError(error.errors[0]);
      } else {
        setError(error.message || "Ocorreu um erro.");
      }

      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  const handleNameTutorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTutorName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleClickPrivacyPolicies = () => {
    setPrivacyPolicies(!privacyPolicies);
  };

  const handleClickGoToLogin = (event: SyntheticEvent) => {
    event.preventDefault();
    router.push("/login");
  };

  return (
    <form
      className="h-full mb-6 mt-2 overflow-y-auto"
      onSubmit={handleClickGoOn}
    >
      {error !== "" && <ErrorWindow textError={error} />}
      {loading && <Loading />}
      <div className="overflow-y-auto" style={{ height: "82%" }}>
        <div className="mb-3">
          <Label labelHtmlFor="tutor-name">Tutor do Petter</Label>
          <Input
            text="Nome do tutor."
            type="text"
            id="tutor-name"
            autoComplete="text"
            onChange={handleNameTutorChange}
          />
        </div>
        <div className="mb-3">
          <Label labelHtmlFor="email">Email</Label>
          <Input
            text="Digite seu email."
            type="email"
            id="email"
            autoComplete="email"
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <Label labelHtmlFor="password">Senha</Label>
          <Input
            text="Digite sua senha."
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <Label labelHtmlFor="passwordRepeat">Confirmar senha</Label>
          <Input
            text="Repita a senha."
            type="password"
            id="passwordRepeat"
            autoComplete="current-password"
            onChange={handleConfirmPasswordChange}
          />
        </div>
      </div>
      <div className="absolute bottom-3 w-[90%]">
        <Label labelHtmlFor="checkbox">
          <div className="flex items-start justify-center gap-5">
            <CheckBox
              checked={privacyPolicies}
              onChange={handleClickPrivacyPolicies}
            />
            <p className="font-secondary mb-[3%]">
              Aceito as políticas de privacidade.
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
