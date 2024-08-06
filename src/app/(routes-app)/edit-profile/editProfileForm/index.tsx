import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import TextArea from "@/components/TextArea/TextArea";
import { useState } from "react";

export default function EditProfileForm() {
  const [variavel, setVariavel] = useState("");

  function handleTextChange() {}

  return (
    <form>
      <Label labelHtmlFor="nome">Nome do Petter</Label>
      <Input
        text="Digite o nome do Petter."
        type="nome"
        id="nome"
        name="petterName"
        autoComplete="nome"
      />
      <Label labelHtmlFor="email">Email do usuário</Label>
      <Input
        text="Digite seu email."
        type="email"
        id="email"
        name="email"
        autoComplete="email"
      />
      <Label labelHtmlFor="nascimentoPetter">
        Data de nascimento do Petter
      </Label>
      <Input
        text="Digite o nome do Petter."
        type="nome"
        id="nome"
        name="petterBirth"
        autoComplete="nome"
      />
      <Label labelHtmlFor="tipo">Tipo do Petter</Label>
      <Input
        text="Digite gênero do Petter."
        type="gender"
        id="gender"
        name="peterKind"
        autoComplete="gender"
      />
      <Label labelHtmlFor="Raça">Raça</Label>
      <Input
        text="Digite a raça do Petter."
        type="race"
        id="race"
        name="petterBreed"
        autoComplete="race"
      />
      <Label labelHtmlFor="genero">Gênero</Label>
      <Input
        text="Digite gênero do Petter."
        type="gender"
        id="gender"
        name="petterGender"
        autoComplete="gender"
      />
      <Label labelHtmlFor="genero">Sobre o Petter.</Label>
      <TextArea
        onTextChange={handleTextChange}
        value={variavel}
        placeholder={"Fale sobre seu Petter"}
        height="44%"
      />
    </form>
  );
}
