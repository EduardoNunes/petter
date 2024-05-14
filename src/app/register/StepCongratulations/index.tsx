import Button from "@/components/Button/Button";
import "./color-fonte.css";

export default function Congratulations() {
  const namePetter = "Sr. Petter";
  const profileImage = "";

  return (
    <div className="flex flex-col items-center justify-start h-[50%]">
      <div className="colorful">
        <p className="font-primary text-ultraLarge">Parabéns!</p>
      </div>
      <img src={profileImage} alt="" />
      <p className="font-secondary">{`Seja bem vindo, ${namePetter}`}!</p>
      <p className="font-secondary">Vamos fazer amigos?</p>

      <div className="absolute w-[90%] bottom-[3%]">
        <Button text="Vamos lá!" type="internalButton" />
      </div>
    </div>
  );
}
