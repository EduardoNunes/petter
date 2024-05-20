import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import TextArea from "@/components/TextArea/TextArea";

export default function EditProfileForm() {
  return (
    <form >
      <Label labelHtmlFor="nome">Nome do Petter</Label>
      <Input
        text="Digite o nome do Petter."
        type="nome"
        id="nome"
        autoComplete="nome"
      />
      <Label labelHtmlFor="email">Email do usuário</Label>
      <Input
        text="Digite seu email."
        type="email"
        id="email"
        autoComplete="email"
      />
      <Label labelHtmlFor="nascimentoPetter">
        Data de nascimento do Petter
      </Label>
      <Input
        text="Digite o nome do Petter."
        type="nome"
        id="nome"
        autoComplete="nome"
      />
      <Label labelHtmlFor="tipo">Tipo do Petter</Label>
      <Input
        text="Digite gênero do Petter."
        type="gender"
        id="gender"
        autoComplete="gender"
      />
      <Label labelHtmlFor="Raça">Raça</Label>
      <Input
        text="Digite a raça do Petter."
        type="race"
        id="race"
        autoComplete="race"
      />
      <Label labelHtmlFor="genero">Gênero</Label>
      <Input
        text="Digite gênero do Petter."
        type="gender"
        id="gender"
        autoComplete="gender"
      />
      <Label labelHtmlFor="genero">Sobre o Petter.</Label>
      <TextArea />
    </form>
  );
}
