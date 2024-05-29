import * as yup from "yup";

export interface PetterUser {
  petterName: string;
  petterkind: string;
  petterBreed: string;
}

export const schemaRegisterPetterInfos = yup.object().shape({
  petterName: yup.string().required("O nome é obrigatório."),
  petterKind: yup.string().required("O tipo do Petter é obrigatório."),
  petterBreed: yup.string().required("A raça é obrigatória."),
});
