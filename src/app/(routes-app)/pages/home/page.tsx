"use client";

import ModalComment from "@/components/Modals/ModalComment/ModalComment";
import Footer from "../../../../components/Footer/Footer";
import ContentHome from "./Content/Content";
import HeaderHome from "./HeaderHome/HeaderHome";
import { useTimeLineContext } from "@/context/timeLineContext";
import { useSelfContext } from "@/context/selfContext";
import { useEffect } from "react";
import Loading from "@/components/Loading/Loading";
import { useHomeContext } from "@/context/homeContext";
import ModalSearch from "@/components/Modals/ModalSearch/ModalSearch";

export default function Home() {
  const { commentsOpenModal } = useTimeLineContext();
  const { isOpenSearch } = useHomeContext();
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
      {isOpenSearch && <ModalSearch />}
      {loading && <Loading />}

      <HeaderHome />
      <div className="w-full h-[calc(100%-124px)]">
        <ContentHome />
      </div>
      <Footer />
    </div>
  );
}
