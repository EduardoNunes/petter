import { getServerSession } from "next-auth";
import Footer from "../../../components/Footer/Footer";
import ContentHome from "./Content/Content";
import HeaderHome from "./HeaderHome/HeaderHome";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    return redirect("/login");
  }

/*   console.log("Nome", session.user?.name)
  console.log("Email", session.user?.email)
  console.log("Image", session.user?.image) */

  return (
    <div className="w-[90%] h-[86%]">
      <HeaderHome />
      <ContentHome />
      <Footer />
    </div>
  );
}
