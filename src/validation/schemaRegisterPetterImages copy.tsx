import * as yup from "yup";

export interface PetterUser {
  image: string;
}

export const schemaRegisterPetterImage = yup.object().shape({
  file: yup.string().required("Carregue pelo menos uma imagem."),
});
