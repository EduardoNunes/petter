import Button from "@/components/Button/Button";
import Petter from "@/components/Petter/Petter";
import Image from "next/image";
import FormLogin from "./FormLogin";

export default function Login() {
  return (
    <div className="w-[90%] h-full">
      <div className="">
        <Petter />
      </div>
      <p className="font-secondary text-small">Vamos nos conectar?</p>
      <Button text="Cadastrar com o Google" type="externalButton">
        <Image
          src="/images/google.png"
          height={24}
          width={24}
          alt="icone Google"
        />
      </Button>
      <Button text="Cadastrar com o Facebook" type="externalButton">
        <Image
          src="/images/facebook.png"
          height={24}
          width={24}
          alt="icone Facebook"
        />
      </Button>
      <FormLogin />
    </div>
  );
}
