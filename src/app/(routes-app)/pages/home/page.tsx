"use client";

import ModalComment from "@/components/ModalComment/ModalComment";
import Footer from "../../../../components/Footer/Footer";
import ContentHome from "./Content/Content";
import HeaderHome from "./HeaderHome/HeaderHome";
import { useTimeLineContext } from "@/context/timeLineContext";
import { useSelfContext } from "@/context/selfContext";
import { useEffect } from "react";
import Loading from "@/components/Loading/Loading";

export default function Home() {
  const { commentsOpenModal } = useTimeLineContext();
  const { getSelf, loading, setLoading } = useSelfContext();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    getSelf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col w-[90%] h-full">
      {commentsOpenModal && <ModalComment />}
      {loading && <Loading />}
      <HeaderHome />
      <div className="w-full h-[calc(100%-124px)]">
        <ContentHome />
      </div>
      <Footer />
    </div>
  );
}
