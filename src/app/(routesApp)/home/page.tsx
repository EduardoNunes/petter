"use client";

import ModalComment from "@/components/ModalComment/ModalComment";
import Footer from "../../../components/Footer/Footer";
import ContentHome from "./Content/Content";
import HeaderHome from "./HeaderHome/HeaderHome";
import { useTimeLineContext } from "@/context/timeLineContext";

export default function Home() {
  const { commentsOpenModal } = useTimeLineContext();

  return (
    <div className="w-[90%] h-[86%]">
      {commentsOpenModal && <ModalComment />}
      <HeaderHome />
      <ContentHome />
      <Footer />
    </div>
  );
}
