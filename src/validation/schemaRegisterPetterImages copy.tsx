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
    file: yup
    .mixed()
    .required("Selecione uma imagem para o perfil do Petter.")
    .test(
      "fileType",
      "Formato de arquivo inválido. Somente JPEG, JPG, PNG são permitidos.",
      (value: any) => {
        return (
          value && ["image/jpeg", "image/jpg", "image/png"].includes(value.type)
        );
      }
    )
    .test("fileSize", "O arquivo não pode ter mais de 30MB.", (value: any) => {
      return value && value.size && value.size <= 30 * 1024 * 1024;
    }),
});
