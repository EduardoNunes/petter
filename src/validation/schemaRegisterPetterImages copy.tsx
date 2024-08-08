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
    .required("Imagem vazia.")
    .max(30000000, "O tamanho da imagem não pode exceder 30MB."),
  type: yup
    .string()
    .oneOf(["image/jpeg", "image/jpg", "image/png"], "Formato de arquivo inválido."),
});
