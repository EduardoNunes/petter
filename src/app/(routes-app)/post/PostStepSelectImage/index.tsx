import Header from "@/components/Header/Header";
import { usePostTimelineContext } from "@/context/postTimelineContext";
import SelectedImage from "../SelectedImage/SelectedImage";
import EnframeImages from "./EnframeImage/EnframeImages";
import LoadGallery from "./LoadGalery/LoadGalery";

export default function PostStepSelectImage() {
  const { image } = usePostTimelineContext();

  return (
    <div className="flex flex-col items-center h-full w-full">
      <Header
        text="Nova divulgação"
        showExit={true}
        routeToGo="home"
        showContinue={image ? true : false}
      />

      <SelectedImage />

      <div className="w-full h-[40%] flex flex-col items-center overflow-auto pb-8">
        <LoadGallery />
      </div>
      <div className="absolute bottom-[3%]">
        <EnframeImages />
      </div>
    </div>
  );
}
