"use client";

import Header from "@/components/Header/Header";
import Petter from "@/components/Petter/PetterColorful";
import { useSelfContext } from "@/context/selfContext";
import api from "@/server/api";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormUserRegisterData from "./FormRegisterDataUser";
import { getItem } from "@/utils/localStorageUtils";
import redirectTo from "@/utils/RedirectTo";

export default function RegisterUserInfos() {
  const { self, getSelf } = useSelfContext();
  const [tutorName, setTutorName] = useState("");
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [loggedBy, setLoggedBy] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    redirectTo(router);
  }, []);

  useEffect(() => {
    const loggedBy = getItem("loggedBy");

    if (loggedBy === "google") {
      fetchSession();
    }
  }, []);

  async function fetchSession() {
    const session = await getSession();

    if (!session) {
      router.push("/register-user/register-credentials");
      return;
    }

    const name = session.user?.name || "";
    const email = session.user?.email || "";
    const image = session.user?.profileImage || "";

    setTutorName(name);
    setEmail(email);
    setUserImage(image);
    setLoggedBy("google");

    postData(name, email, image, "google");
  }

  async function postData(
    name: string,
    email: string,
    image: string,
    loggedBy: string
  ) {
    const session = await getSession();
    const token = session?.user.accessToken;

    try {
      await api.post(
        "/users-credentials",
        {
          name,
          email,
          password,
          profileImage: image,
          loggedBy,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Informações de usuário cadastradas com sucesso.");
      router.push("/register-user/register-infos");
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  return (
    <div className="flex flex-col w-[90%] h-[86%]">
      <Header text="Cadastro do Tutor" />
      <div className="flex flex-col items-center mb-2">
        <Petter fontSize="extraLarge" />
        <p className="font-secondary font-bold text-medium text-center mb-[3%]">
          Seja bem vindo{`(a)`}, {self.name?.split(" ")[0]}!
        </p>
        <p className="font-secondary text-smaller text-center mb-[4%]">
          Nos conte mais sobre você, {self.name?.split(" ")[0]}. Queremos
          conhecer melhor os amigos dos Petters!
        </p>
      </div>
      <FormUserRegisterData />
    </div>
  );
}
