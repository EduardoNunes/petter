import Header from "@/components/Header/Header";
import Loading from "@/components/Loading/Loading";
import { useSelfContext } from "@/context/selfContext";
import { useEffect } from "react";
import SelectedImage from "../SelectedImage/SelectedImage";
import LoadGallery from "./LoadGalery/LoadGalery";
import { usePostImageContext } from "@/context/postImageContext";

export default function PostStepSelectImage() {
  const { image, timelineOrGallery } = usePostImageContext();
  const { loading, setLoading } = useSelfContext();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-full w-full">
      {loading && <Loading />}
      <Header
        text={`Divulgar na ${
          timelineOrGallery === "timeline" ? "timeline" : "galeria"
        }`}
        showExit={true}
        routeToGo="home"
        showContinue={image ? true : false}
      />
      <div className="w-full h-[calc(100%-96px)]">
        <SelectedImage />
      </div>
      <div className="w-full mt-4">
        <LoadGallery />
      </div>
    </div>
  );
}
