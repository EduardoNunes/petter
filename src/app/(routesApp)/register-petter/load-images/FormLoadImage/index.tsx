"use client";

import Button from "@/components/Button/Button";
import ErrorWindow from "@/components/Error/ErrorWindown";
import Loading from "@/components/Loading/Loading";
import api from "@/server/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function FormLoadImages() {
  const [images, setImages] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const router = useRouter();
  const petterIdStr = localStorage.getItem("petterId");

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (!petterIdStr) {
      setError("Petter ID não encontrado no localStorage");
      return;
    }

    const petterIdNum = Number(petterIdStr);
    console.log("PETID", typeof(petterIdNum))
    try {
      setLoading(true);

      const formData = new FormData(); 

      for (const image of images) {
        formData.append("petterId", petterIdNum.toString());
        formData.append("description", description);
        formData.append("images", image); 
      }

      const response = await api.post("petter-register-images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("RESPONSE", response);

      if (response.status !== 200) {
        throw new Error("Erro ao enviar a imagem");
      }

      router.push("");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError(error.message || "Ocorreu um erro.");
      }
    } finally {
      setLoading(false);
    }
  }

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newImages = Array.from(e.target.files ?? []);

    if (newImages.length > 0) {
      setImages((prevImages) => prevImages.concat(newImages));
    }
  };

  const handleClickOpenTrash = (index: number) => {
    if (selectedImageIndex === index) {
      setSelectedImageIndex(null);
      return;
    }
    setSelectedImageIndex(index);
  };

  const handleClickDeleteImage = () => {
    if (selectedImageIndex !== null) {
      setImages((prevImages) =>
        prevImages.filter((_, idx) => idx !== selectedImageIndex)
      );
      setSelectedImageIndex(null);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-start h-[72%] w-full"
    >
      {error && <ErrorWindow textError={error} setError={setError} />}
      {loading && <Loading />}
      <label
        htmlFor="fileInput"
        className="flex items-center justify-center w-full cursor-pointer h-10 rounded-3xl bg-azulPalido mb-[6%]"
      >
        <span className="flex items-center h-10 font-secondary font-bold">
          Selecionar fotos
        </span>
        <input
          id="fileInput"
          type="file"
          className="block w-0 h-0 font-secondary"
          name="images"
          onChange={uploadImage}
          multiple
          accept=".jpg, .jpeg"
          capture="user"
        />
      </label>
      <div className="flex flex-wrap justify-center w-full max-h-[75%] gap-3 overflow-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-[140px] h-[100px]"
            onClick={() => handleClickOpenTrash(index)}
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Imagem ${index + 1}`}
              className="w-[140px] h-[100px] rounded-2xl"
            />
            {selectedImageIndex === index && (
              <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-24 bg-black opacity-50 rounded-2xl flex items-center justify-center">
                <Image
                  src="/images/trash.png"
                  height={38}
                  width={38}
                  alt="icone Google"
                  className="z-10 cursor-pointer"
                  onClick={handleClickDeleteImage}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-[3%] w-[90%]">
        <Button text="Continuar" type="internalButton" />
      </div>
    </form>
  );
}
