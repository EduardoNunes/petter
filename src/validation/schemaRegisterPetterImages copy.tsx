import * as yup from "yup";

export interface PetterUser {
  name: string;
  size: number;
  type: string;
}

export const schemaRegisterPetterImage = yup.object().shape({
  name: yup.string().required("Por favor, forneça o nome da imagem."),
  size: yup
    .number()
    .required("Por favor, forneça o tamanho da imagem.")
    .max(20000000, "O tamanho da imagem não pode exceder 15MB."),
  type: yup.string().required("Por favor, forneça o tipo da imagem."),
});
