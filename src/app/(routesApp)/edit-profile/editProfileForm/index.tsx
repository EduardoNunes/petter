import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";

export default function EditProfileForm() {
  return (
    <form>
      <Label labelHtmlFor="Nome">Nome do Petter</Label>
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
      <Label labelHtmlFor="Nome">Nome</Label>
      <Input
        text="Digite seu nome."
        type="nome"
        id="nome"
        autoComplete="nome"
      />
      <Label labelHtmlFor="Nome">Nome</Label>
      <Input
        text="Digite seu nome."
        type="nome"
        id="nome"
        autoComplete="nome"
      />
      <Label labelHtmlFor="Nome">Nome</Label>
      <Input
        text="Digite seu nome."
        type="nome"
        id="nome"
        autoComplete="nome"
      />
    </form>
  );
}
