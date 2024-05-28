"use client";

import Header from "@/components/Header/Header";
import Petter from "@/components/Petter/PetterColorful";
import api from "@/server/api";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InfosRegisterDataUser from "./infosRegisterDataUser";
import FormUserRegisterData from "./FormRegisterDataUser";

export default function RegisterUserInfos() {
  const [tutorName, setTutorName] = useState("");
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();

      if (!session) {
        router.push("/register-user/register-credentials");
        return;
      }
      localStorage.setItem("tutorName", session.user?.name || "");
      setTutorName(session.user?.name || "");
      setEmail(session.user?.email || "");
      setUserImage(session.user?.image || "");

      registerByAuth();
    }

    fetchSession();
  }, []);

  const registerByAuth = () => {
    async function postData() {
      try {
        const response = await api.post("/users-register-credentials", {
          name: tutorName,
          email,
          password,
          profileImage: userImage,
        });

        console.log((await response).status, "RESPONSE");

        if ((await response).status === 201) {
          router.push("/register-user/register-infos");
        }
      } catch (error) {
        console.log("ERROR", error);
      }
    }

    if (email) {
      postData();
    }
  };

  return (
    <div className="flex flex-col w-[90%] h-[86%]">
      <Header text="Cadastro do Tutor" />
      <div className="flex flex-col items-center mb-2">
        <Petter fontSize="extraLarge" />
        <InfosRegisterDataUser />
      </div>
      <FormUserRegisterData />
    </div>
  );
}
