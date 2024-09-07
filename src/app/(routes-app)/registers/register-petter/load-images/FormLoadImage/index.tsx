"use client";

import Button from "@/components/Button/Button";
import errorResponse from "@/components/Error/ErrorResponse";
import MessageToast from "@/components/Error/MessageToast";
import { useSelfContext } from "@/context/selfContext";
import api from "@/server/api";
import { schemaRegisterPetterImage } from "@/validation/schemaRegisterPetterImages copy";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

interface PetterInfo {
  id: number;
}

export default function FormLoadImages() {
  const [images, setImages] = useState<File[]>([]);
  const { setLoading } = useSelfContext();
  const [toast, setToast] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const router = useRouter();

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    
    if (images.length === 0) {
      setLoading(false);
      setToast("Carregue pelo menos uma imagem do Petter.");
      return;
    } else if (images.length > 20) {
      setLoading(false);
      setToast("Por enquanto o máximo de imagens permitidas são 20.");
      return;
    }

    const session = await getSession();
    const token = session?.user.accessToken;
    const petterInfo = session?.user.petterInfo as PetterInfo[];
    setLoading(true);

    try {
      const formData = new FormData();

      for await (const image of images) {
        schemaRegisterPetterImage.validate(
          {
            name: image.name,
            size: image.size,
            type: image.type,
            file: image,
          },
          { abortEarly: false }
        );
      }

      if (petterInfo && petterInfo.length > 0) {
        for await (const image of images) {
          formData.append("petterId", petterInfo[0]?.id?.toString());
          formData.append("description", "");
          formData.append("images", image);
        }
      }

      const response = await api.post("petter-register-images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setToast("Sucesso! Aguarde");
      router.replace("/registers/register-petter/about-petter");
    } catch (error: any) {
      const response = errorResponse(error);
      setLoading(false);
      setToast(response);
    }
    setLoading(false);
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
      className="flex flex-col items-start justify-between h-full w-full"
      style={{ height: "calc(100% - 216px)" }}
    >
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      <div className="flex flex-col items-center w-full overflow-auto">
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
            accept=".jpg, .jpeg, .png"
            capture="user"
          />
        </label>
        <div className="flex flex-wrap justify-center w-full gap-3 overflow-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-[140px] h-[100px]"
              onClick={() => handleClickOpenTrash(index)}
            >
              <Image
                src={URL.createObjectURL(image)}
                width={3000}
                height={3000}
                alt={`Imagem ${index + 1}`}
                className="object-cover w-[140px] h-[100px] rounded-2xl"
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
      </div>
      <div className="w-full mt-2">
        <Button text="Continuar" type="internalButton" />
      </div>
    </form>
  );
}
