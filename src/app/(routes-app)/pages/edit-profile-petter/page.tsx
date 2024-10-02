"use client";

import Header from "@/components/Header/Header";
import Image from "next/image";
import EditProfileForm from "./editProfileForm/EditprofileForm";
import { useSelfContext } from "@/context/selfContext";
import { useQuery } from "react-query";
import { useState } from "react";

export default function EditProfilePetter() {
  const { getSelf } = useSelfContext();
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState("");

  const { data } = useQuery("self", getSelf);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfileImageFile(file);
      const url = URL.createObjectURL(file);
      setProfileUrl(url);
    }
  };

  return (
    <div className="flex flex-col items-end w-[90%] h-full">
      <Header
        showExit={true}
        text="Editar perfil"
        routeToGo="/pages/user-profile"
      />
      <div className="h-[93%] w-full">
        <div className="flex items-center w-1/2 h-24 mb-4">
          <Image
            src={
              profileUrl ||
              data?.PetterInfo?.[0]?.profileImage ||
              "/images/paw.png"
            }
            width={150}
            height={150}
            alt="Profile Image"
            className="object-cover w-24 h-24 rounded-full border-lime-950 border-solid border-[3px]"
          />
          <label className="ml-2 cursor-pointer">
            <Image
              src="/images/trade.png"
              width={32}
              height={32}
              alt="Icon trade"
              className="h-8 w-8"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleChangeImage}
              className="hidden"
            />
          </label>
        </div>
        <div className="w-full h-[calc(100%-112px)] overflow-auto pb-4">
          <EditProfileForm profileImageFile={profileImageFile} />
        </div>
      </div>
    </div>
  );
}
