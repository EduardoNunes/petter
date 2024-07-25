export default function InfosRegisterDataUser() {
  return (
    <>
      <p className="font-secondary font-bold text-medium text-center mb-[3%]">
        Seja bem vindo{`(a)`}, {localStorage.getItem("tutorName")}!
        {/*   Agora vamos dar personalidade ao seu pet e transforme-o em um Petter! */}
      </p>
      <p className="font-secondary text-smaller text-center mb-[4%]">
        Nos conte mais sobre você, {localStorage.getItem("tutorName")}. Queremos conhecer
        melhor os amigos dos Petters!
        {/*    Vamos formar a maior comunidade de fofuras do mundo! */}
      </p>
    </>
  );
}
