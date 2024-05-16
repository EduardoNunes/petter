import ContentHome from "./Content/Content";
import FooterHome from "./FooterHome/FooterHome";
import HeaderHome from "./HeaderHome/HeaderHome";

export default function Home() {
  return (
    <div className="w-[90%] h-[86%]">
      <HeaderHome />
      <ContentHome />
      <FooterHome />
    </div>
  );
}
