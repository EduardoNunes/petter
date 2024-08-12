interface formatCep {
  cep: string;
}

export default function formatCep(cep: string, setCep: (cep: string) => void) {
  let digitos = cep.replace(/\D/g, "");
  let formatted = "";

  if (digitos.length > 5) {
    formatted += `${digitos.substring(0, 5)}-${digitos.substring(5, 8)}`;
  } else {
    formatted = digitos;
  }
  setCep(formatted);

  return setCep(formatted);
}
