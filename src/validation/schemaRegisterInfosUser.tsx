import * as yup from "yup";

export interface InfosUser {
  data: string;
  cpf: string;
  gender: string;
}

export const schemaRegisterInfosUser = yup.object().shape({
  date: yup
    .date()
    .typeError("A data fornecida não é uma data válida.")
    .max(new Date(), "A data não pode ser maior que a data atual")
    .required("Data é obrigatória")
});
