"use client";

import Loading from "@/components/Loading/Loading";
import ModalComment from "@/components/Modals/ModalComment/ModalComment";
import ModalSearch from "@/components/Modals/ModalSearch/ModalSearch";
import { useHomeContext } from "@/context/homeContext";
import { useSelfContext } from "@/context/selfContext";
import { useTimeLineContext } from "@/context/timeLineContext";
import { useQuery } from "react-query";
import Footer from "../../../../components/Footer/Footer";
import ContentHome from "./Content/Content";
import HeaderHome from "./HeaderHome/HeaderHome";

export default function Home() {
  const { commentsOpenModal } = useTimeLineContext();
  const { isOpenSearch } = useHomeContext();
  const { getSelf } = useSelfContext();

  const { isLoading } = useQuery("self", getSelf);

  return (
    <div className="flex flex-col w-[90%] h-full">
      {commentsOpenModal && <ModalComment />}
      {isOpenSearch && <ModalSearch />}
      {isLoading && <Loading />}

      <HeaderHome />
      <div className="w-full h-[calc(100%-124px)]">
        <ContentHome />
      </div>
      <Footer />
    </div>
  );
}
