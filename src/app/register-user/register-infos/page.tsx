"use client"

import Header from "@/components/Header/Header";
import Petter from "@/components/Petter/PetterColorful";
import api from "@/server/api";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

      setTutorName(session.user?.name || "");
      setEmail(session.user?.email || "");
      setUserImage(session.user?.image || "");

      try {
        const response = await api.post("/users-register-credentials", {
          name: tutorName,
          email,
          password,
          profileImage: userImage,
        });
      } catch (error) {
        console.log("ERROR", error)
      }
      
    }

    fetchSession();
  }, []);

  return (
    <div className="flex flex-col w-[90%] h-[86%]">
      <Header text="Cadastro do tutor" />
      <div className="flex flex-col items-center mb-2">
        <Petter fontSize="extraLarge" />
      </div>
    </div>
  );
}
