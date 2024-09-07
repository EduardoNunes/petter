"use client";

import Header from "@/components/Header/Header";
import Petter from "@/components/Petter/PetterColorful";
import api from "@/server/api";
import { getItem } from "@/utils/localStorageUtils";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormUserRegisterData from "./FormRegisterDataUser";
import { useSelfContext } from "@/context/selfContext";
import Loading from "@/components/Loading/Loading";

export default function RegisterUserInfos() {
  const { loading, setLoading } = useSelfContext();
  const [tutorName, setTutorName] = useState("");
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [loggedBy, setLoggedBy] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const dataInfos = async () => {
      const session = await getSession();

      if (session && session.user.name) {
        setName(session?.user.name);
      }
    };

    dataInfos();
  }, []);

  useEffect(() => {
    const loggedBy = getItem("loggedBy");

    if (loggedBy === "google") {
      fetchSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Essa função é p caso o usuário tenha logado com o google, ela chama a função seguinte postData
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
    <div className="flex flex-col justify-start w-[90%] h-full pb-2">
      {loading && <Loading />}
      <div className="h-[173px]">
        <Header text="Cadastro do Tutor" />
        <div className="flex flex-col items-center">
          <Petter fontSize="extraLarge" />
          <p className="font-secondary font-bold text-medium text-center mb-[3%]">
            Seja bem vindo{`(a)`}, {name.split(" ")[0]}!
          </p>
        </div>
      </div>
      <div className="overflow-y-auto" style={{ height: "calc(100% - 173px)" }}>
        <p className="font-secondary text-smaller text-center">
          Nos conte mais sobre você, {name.split(" ")[0]}. Queremos conhecer
          melhor os amigos dos Petters!
        </p>
        <FormUserRegisterData />
      </div>
    </div>
  );
}
