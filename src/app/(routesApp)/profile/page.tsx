import Footer from "@/components/Footer/Footer";
import Image from "next/image";

export default function Profile() {
  const userName = "Sr. Petter";
  return (
    <div className="w-[90%]">
      <div className="absolute top-2 flex items-center justify-between h-8 w-[90%]">
        <div>
          <h1 className="text-extraLarge1">{userName}</h1>
        </div>
        <div className="flex h-8 gap-2">
          <Image
            src="/images/add.png"
            width={32}
            height={32}
            alt="Home"
            className=""
          />
          <Image
            src="/images/menu-hamburguer.png"
            width={39}
            height={39}
            alt="Home"
            className=""
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
