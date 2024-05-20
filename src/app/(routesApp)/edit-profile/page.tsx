"use client";

import Header from "@/components/Header/Header";
import Image from "next/image";
import EditProfileForm from "./editProfileForm";

export default function EditProfile() {
  return (
    <div className="flex items-end w-[90%] h-full">
      <Header
        showExit={true}
        text="Editar perfil"
        showContinue={true}
        routeToGo="profile"
      />
      <div className="h-[93%] w-full">
        <div className="flex items-center w-24 h-24 mb-4">
          <Image
            src="/dataTemp/dog3.jpeg"
            width={150}
            height={150}
            alt="Profile Image"
            className="object-cover w-full h-full rounded-full border-lime-950 border-solid border-[3px]"
          />
          <Image
            src="/images/trade.png"
            width={32}
            height={32}
            alt="Icon trade"
            className="h-8 w-8"
          />
        </div>
        <div className="w-full h-[calc(100%-112px)] overflow-auto pb-4">
          <EditProfileForm />
        </div>
      </div>
    </div>
  );
}
