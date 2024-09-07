import Header from "@/components/Header/Header";
import { usePostTimelineContext } from "@/context/postTimelineContext";
import SelectedImage from "../SelectedImage/SelectedImage";
import EnframeImages from "./EnframeImage/EnframeImages";
import LoadGallery from "./LoadGalery/LoadGalery";
import { useSelfContext } from "@/context/selfContext";
import { useEffect } from "react";
import Loading from "@/components/Loading/Loading";

export default function PostStepSelectImage() {
  const { image } = usePostTimelineContext();
  const { loading, setLoading } = useSelfContext();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-full w-full">
      {loading && <Loading />}
      <Header
        text="Nova divulgação"
        showExit={true}
        routeToGo="home"
        showContinue={image ? true : false}
      />

      <SelectedImage />

      <LoadGallery />

      <EnframeImages />
    </div>
  );
}
