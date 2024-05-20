import Footer from "../../../components/Footer/Footer";
import ContentHome from "./Content/Content";
import HeaderHome from "./HeaderHome/HeaderHome";

export default function Home() {
  return (
    <div className="w-[90%] h-[86%]">
      <HeaderHome />
      <ContentHome />
      <Footer />
    </div>
  );
}
