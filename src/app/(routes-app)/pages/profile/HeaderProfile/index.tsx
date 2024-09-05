import { useSelfContext } from "@/context/selfContext";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeaderProfileProps {
  petterName: string;
}

export default function HeaderProfile({ petterName }: HeaderProfileProps) {
  const {loading, setLoading} = useSelfContext();
  const router = useRouter();

  async function logout() {
    setLoading(true);

    await signOut({
      redirect: false,
    });

    setTimeout(() => {
      router.replace("/login");
    }, 3000);
  }

  return (
    <div className="flex items-center justify-between h-[62px] w-full">
      <div>
        <h1 className="text-extraLarge1">{petterName}</h1>
      </div>
      <div className="flex h-8 gap-2">
        <Image
          src="/images/add.png"
          width={32}
          height={32}
          alt="Home"
          className="h-auto w-auto"
        />
        <Image
          src="/images/menu-hamburguer.png"
          width={39}
          height={39}
          alt="Home"
          className="h-auto w-auto"
        />
        <button onClick={logout}>
          <Image
            src="/images/logout.png"
            width={32}
            height={32}
            alt="Logout"
            className="h-auto w-auto"
          />
        </button>
      </div>
    </div>
  );
}
