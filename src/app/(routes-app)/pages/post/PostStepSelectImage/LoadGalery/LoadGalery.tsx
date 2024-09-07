import MessageToast from "@/components/Error/MessageToast";
import { usePostTimelineContext } from "@/context/postTimelineContext";
import { useSelfContext } from "@/context/selfContext";
import { useState } from "react";

export default function LoadGallery() {
  const { setImageURL, setImage } = usePostTimelineContext();
  const { setLoading } = useSelfContext();
  const [toast, setToast] = useState("");

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const imageUrl = URL.createObjectURL(file);
      setImageURL(imageUrl);
      setImage(file);
    }
    setLoading(false);
  };

  return (
    <div className="w-full mt-8">
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      <div className="flex mt-6">
        <label
          htmlFor="fileInput"
          className="flex items-center justify-center w-full cursor-pointer h-10 rounded-3xl bg-azulPalido mb-4"
        >
          <span className="flex items-center h-10 font-secondary font-bold">
            Selecionar imagem.
          </span>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            name="images"
            onChange={uploadImage}
            accept=".jpg, .jpeg, .png"
          />
        </label>
      </div>
    </div>
  );
}
