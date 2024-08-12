"use client";

import ModalComment from "@/components/ModalComment/ModalComment";
import Footer from "../../../../components/Footer/Footer";
import ContentHome from "./Content/Content";
import HeaderHome from "./HeaderHome/HeaderHome";
import { useTimeLineContext } from "@/context/timeLineContext";
import { useSelfContext } from "@/context/selfContext";
import { useEffect } from "react";

export default function Home() {
  const { commentsOpenModal } = useTimeLineContext();
  const { getSelf } = useSelfContext();

  useEffect(() => {
    getSelf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-[90%] h-[86%]">
      {commentsOpenModal && <ModalComment />}
      <HeaderHome />
      <ContentHome />
      <Footer />
    </div>
  );
}
