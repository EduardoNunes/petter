This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

getSession() = pega informações do usuário direto da atualização de callback do api/route. Melhor para pegar informações primordias como credenciais id do usuário, token ou para informações atualizadas.

getSelf() = pega informações do usuário atráves de um context. Melhor para informações periféricas como petterInfos e userInfos.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

Fluxos:
Página de apresentação: Dura 3 segundos e redireciona para Login.

Cadastro de usuário
    1 - registro das crecenciais email, senha e aceitação dos termos de uso. (Sucesso redireciona p login).
    2 - Login.
    3 - Registro das informações pessoais.
    4 - Página de validação de boas práticas.

Cadastro de Petter
    1 - Registro das informações do petter e da imagem de profile.
    2 - Upload de imagens de profile.
    3 - Registro da descrição da Bio.
    4 - Pagina de conclusão (Congratulatios).

Timeline (Home).
    1 - Cabeçalho TIMELINE (NÃO FUNCIONAL AINDA).
    2 - Content TIMELINE: possui um card com cabeçalho, content e footer
        2.1 - Header (NÃO FUNCIONAL AINDA)
        2.2 - Content: Imagens publicadas por algum usuário com Petter cadastrado.
        2.3 - Footer.
            2.3.1 - Botão de curtir (somente altera o número de curtidas).
            2.3.2 - Botão de comentário (abre Modal com lista de comentários).
                2.3.2.1 - Modal de comentários: @components/ModalComment.
                        2.3.2.1.1 - X: Botão de saída do modal
                        2.3.2.1.2 - Content: Local de exibição das imagens ordenada N > M
                        2.3.2.1.3 - Input: Input para enviar comentário em nome do Petter logado.
                            2.3.2.1.3.1 - Send: Botão de submeter comentário que deve aparecer imediatamente no topo do Content (2.2)
            2.3.3 - Descrição da imagem criada no momento da postagem pelo usuário.
    3 - Footer TIMELINE.
        3.1 - Home: Botão que direciona para a timeline.
        3.2 - Petinder: (NÃO FUNCIONAL AINDA).
        3.3 - ADD: Botão que leva para a adição de nova imagem na timeline em 2 STEPS.
            3.3.1: STEP 1: Selecionar imagem.
                3.3.1.1 - Header:
                    3.3.1.1.1 - X: Botão de sair. Direciona para timeline.
                    3.3.1.1.2 - Title: Título do Step atual
                    3.3.1.1.3 - Botão Continuar: Somente é exibido após uma imagem ser selecionada.
                3.3.1.2 - Content: Local de exibição da imagem selecionada, nenhuma por default.
                3.3.1.3 - Galery: Exibição das imagens em PNG, JPG, JPEG da galeria do dispositivo do usuário em 4 colunas.
                3.3.1.4 - Botão de aproximar imagem selecionada exibida no content(3.3.1.2) (Quebrado, aproxima mas n envia aproximada).
            3.3.2: STEP 2:
                3.3.2.1 - Header: Igual ao Header(3.3.1.1), porém sem o Botão Continuar(3.3.1.1.3).
                3.3.2.2 - Content: Exibição da imagem selecionada.
                3.3.2.3 - Caixa de texto: Local para o usuário informar a descrição da imagem que será exibida na timeline.
                3.3.2.4 - Botão Publicar: Publica a imagem na timeline.
        3.4 - PetterShopp: (NÃO FUNCIONAL AINDA).
        3.5 - Profile: Botão que leva ao perfil do Petter.
            3.5.1 - Header Profile (NÃO FUNCIONAL AINDA);
            3.5.2 - Infos Profile: Exibe informações básicas do Petter:
                3.5.2.1 - Imagem de perfil cadastrada no momento de cadastro do PetterInfos.
                3.5.2.2 - Posts: Quantidade de postagens na galeria do perfil do Petter.
                3.5.2.3 - Amigos: (NÃO FUNCIONAL AINDA).
                3.5.2.4 - Paw One: Raça do petter.
                3.5.2.5 - Paw Two: Tipo de animal do Petter.
            3.5.3 - Bio: Descrição do Petter inserida pelo usuário da conta.
            3.5.4 - Editar Perfil: Botão de editar perfil (QUEBRADO)
            3.5.5 - Galery: Galeria que mostra as imagens do Petter adicionadas pelo usuário.
