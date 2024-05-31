"use client";

import Button from "@/components/Button/Button";
import { useStepContext } from "@/context/useStepContext";
import Image from "next/image";
import { useState } from "react";

export default function FormLoadImages() {
  const [images, setImages] = useState<string[]>([]);
  const { handleToAddCurrentStep } = useStepContext();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newImages = Array.from(e.target.files ?? []);

    if (newImages.length > 0) {
      const newUrls = newImages.map((image) => URL.createObjectURL(image));
      setImages((prevImages) => prevImages.concat(newUrls));
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
      onSubmit={handleToAddCurrentStep}
      className="flex flex-col items-start h-[72%] w-full"
    >
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
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className="relative w-[140px] h-[100px]"
            onClick={() => handleClickOpenTrash(index)}
          >
            <img
              src={imageUrl}
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
