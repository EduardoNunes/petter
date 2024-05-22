import * as yup from "yup";

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const schemaRegisterCredentialsUser = yup.object().shape({
  name: yup
    .string()
    .required("O nome é obrigatório.")
    .test(
      "min-two-words",
      "Digite seu nome completo.",
      (value) => {
        if (!value) return false;
        const words = value.trim().split(" ");
        return words.length >= 2;
      }
    ),
  email: yup
    .string()
    .email("O e-mail deve ser válido.")
    .required("O e-mail é obrigatório."),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .required("A senha é obrigatória."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem ser iguais.")
    .required("A confirmação de senha é obrigatória."),
});
