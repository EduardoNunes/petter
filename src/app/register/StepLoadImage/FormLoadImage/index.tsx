"use client";

import Button from "@/components/Button/Button";
import { useStepContext } from "@/context/useStepContext";
import { useState } from "react";

export default function LoadImages() {
  const [images, setImages] = useState<string[]>([]);
  const { handleToAddCurrentStep } = useStepContext();

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newImages = Array.from(e.target.files ?? []);

    if (newImages.length > 0) {
      const newUrls = newImages.map((image) => URL.createObjectURL(image));
      setImages((prevImages) => prevImages.concat(newUrls));
    }
  };

  return (
    <form
      onSubmit={handleToAddCurrentStep}
      className="flex flex-col items-start h-[72%]"
    >
      <label
        htmlFor="fileInput"
        className="flex items-center justify-center w-full cursor-pointer h-10 rounded-3xl bg-azulPalido mb-[6%]"
      >
        <span
          className="flex items-center h-10 font-secondary font-bold"
          onChange={uploadImage}
        >
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
          <div key={index} className="w-[140px] h-[100px] bg-slate-500">
            <img
              src={imageUrl}
              alt={`Imagem ${index + 1}`}
              className="w-[140px] h-[100px] rounded-2xl"
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-[3%] w-[90%]">
        <Button text="Continuar" type="internalButton" />
      </div>
    </form>
  );
}
