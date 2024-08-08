import * as yup from "yup";

export interface InfosUser {
  data: string;
  cpf: string;
  gender: string;
}

export const schemaRegisterInfosUser = yup.object().shape({
  date: yup
    .date()
    .required("Data é obrigatória")
    .typeError("A data fornecida não é uma data válida.")
    .max(new Date(), "A data não pode ser maior que a data atual")
    .min(new Date("1900-01-01"), "A data deve ser de uma pessoa viva."),
  gender: yup
    .string()
    .required("Informe um gênero ou marque a opção (Prefiro não informar.)"),
  phone: yup
  .string()
  .required("Informe o DDD e seu número de celular.")
  .matches(/^[\d\+\-\(\)\s]{16,}$/, "Adicione o DDD com um número válido."),
  cep: yup
    .string()
    .required("O CEP é obrigatório.")
    .matches(/^\d{5}-\d{3}$/, "CEP deve estar no formato XXXXX-XXX"),
});
