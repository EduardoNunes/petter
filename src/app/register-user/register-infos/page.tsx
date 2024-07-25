"use client";

import Header from "@/components/Header/Header";
import Petter from "@/components/Petter/PetterColorful";
import api from "@/server/api";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormUserRegisterData from "./FormRegisterDataUser";

export default function RegisterUserInfos() {
  const [tutorName, setTutorName] = useState("");
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [loggedBy, setLoggedBy] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loggedBy = localStorage.getItem("loggedBy");

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
    const image = session.user?.image || "";
  
    setTutorName(name);
    setEmail(email);
    setUserImage(image);
    setLoggedBy("google");
  
    localStorage.setItem("tutorName", name);
    localStorage.setItem("email", email);
    localStorage.setItem("image", image);
    localStorage.setItem("loggedBy", "google");
  
    postData(name, email, image, "google");
  }

  async function postData(
    name: string,
    email: string,
    image: string,
    loggedBy: string
  ) {
    try {
      const response = await api.post("/users-credentials", {
        name,
        email,
        password,
        profileImage: image,
        loggedBy,
      });

      console.log(response, "RESPONSE");

      if (response.status === 201) {
        localStorage.setItem("userId", response.data.id);
        router.push("/register-user/register-infos");
      }
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
          Seja bem vindo{`(a)`},{" "}
          {localStorage.getItem("tutorName")?.split(" ")[0] || ""}!
        </p>
        <p className="font-secondary text-smaller text-center mb-[4%]">
          Nos conte mais sobre você,{" "} {localStorage.getItem("tutorName")?.split(" ")[0] || ""}. Queremos conhecer
          melhor os amigos dos Petters!
        </p>
      </div>
      <FormUserRegisterData />
    </div>
  );
}
