export default function InfosRegisterDataUser() {
  const tutorName = localStorage.getItem("tutorName");

  return (
    <>
      <p className="font-secondary font-bold text-medium text-center mb-[3%]">
        Seja bem vindo, {tutorName?.split(" ")[0]}!
        {/*   Agora vamos dar personalidade ao seu pet e transforme-o em um Petter! */}
      </p>
      <p className="font-secondary text-smaller text-center mb-[4%]">
        Nos conte mais sobre você, {tutorName?.split(" ")[0]}. Queremos conhecer
        melhor os amigos dos Petters!
        {/*    Vamos formar a maior comunidade de fofuras do mundo! */}
      </p>
    </>
  );
}
