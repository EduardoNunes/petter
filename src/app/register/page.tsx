import Header from "@/components/Header/Header";
import Petter from "@/components/Petter/Petter";
import InfosDataRegister from "./StepDataRegister/InfosDataRegister";
import FormRegister from "./StepDataRegister/FormRegister";
import InfosLoadImage from "./StepLoadImage/InfosLoadImage";
import LoadImages from "./StepLoadImage/FormLoadImage";

export default function Register() {
  return (
    <div className="flex flex-col justify-center w-[90%] h-[90%]">
      <div className="text-center">
        <Header text="Cadastro" />
      </div>
      <div className="flex flex-col items-center mb-[6%]">
        <Petter />
        {/*  <InfosDataRegister /> */}
        <InfosLoadImage />
      </div>

      {/* <FormRegister /> */}
      <LoadImages />
    </div>
  );
}
