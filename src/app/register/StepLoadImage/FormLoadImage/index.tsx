"use client";

import { useState } from "react";

export default function LoadImages() {
  const [images, setImages] = useState<string[]>([]);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newImages = Array.from(e.target.files ?? []);

    if (newImages.length > 0) {
      const newUrls = newImages.map((image) => URL.createObjectURL(image));
      setImages((prevImages) => prevImages.concat(newUrls));
    }
  };

  return (
    <form>
      <input
        className="font-secondary"
        type="file"
        name="images"
        onChange={uploadImage}
        multiple
      />
      <div className="flex flex-wrap justify-center">
        {images.map((imageUrl, index) => (
          <div key={index} className="w-[150px] h-[100px] m-3">
            <img
              src={imageUrl}
              alt={`Imagem ${index + 1}`}
              className="rounded-2xl"
            />
          </div>
        ))}
      </div>
    </form>
  );
}
