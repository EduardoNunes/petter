import * as yup from "yup";

export const schemaPostComment = yup.object().shape({
  commentAdd: yup
    .string()
    .required("Escreva alguma mensagem."),
});
