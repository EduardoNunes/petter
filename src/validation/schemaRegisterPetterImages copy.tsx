import * as yup from "yup";

export interface PetterUser {
  petterName: string;
  petterkind: string;
  petterBreed: string;
  petterBirth: string;
}

const today = new Date();
const minDate = new Date("1400-01-01");

export const schemaRegisterPetterImage = yup.object().shape({
  image: yup.string().required("Carregue pelo menos uma imagem."),
});
