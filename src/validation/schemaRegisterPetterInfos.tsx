import * as yup from "yup";

export interface PetterUser {
  petterName: string;
  petterkind: string;
  petterBreed: string;
  petterBirth: string;
}

const today = new Date();
const minDate = new Date("1400-01-01");

export const schemaRegisterPetterInfos = yup.object().shape({
  petterName: yup.string().required("O nome é obrigatório."),
  petterKind: yup.string().required("O tipo do Petter é obrigatório."),
  petterBreed: yup.string().required("A raça é obrigatória."),
  petterBirth: yup
    .string()
    .required('Se não souber a data, marque a opção "Não sei a data."')
    .max(today.getTime(), "A data não pode ser maior que a data atual.")
    .test(
      "is-valid-date-or-unknown",
      'Escolha uma data válida ou marque a caixinha. "Não sei a data".',
      (value) => {
        if (value === "Não sei a data.") return true;
        if (!value) return false;
        const date = new Date(value);
        return date >= minDate && date <= today;
      }
    ),
});
