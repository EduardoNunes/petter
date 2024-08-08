import * as yup from "yup";

export interface DescriptionBio {
    descriptionBio: string;
}

export const schemaAboutPetter = yup.object().shape({
  descriptionBio: yup
    .string()
    .max(355, 'A descrição pode ter no máximo 355 caracteres.')
    .required('Descreva um pouco sobre seu Petter.'),
});
