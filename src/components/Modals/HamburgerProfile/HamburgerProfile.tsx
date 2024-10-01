import { useSelfContext } from "@/context/selfContext";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const styleLi =
  "flex items-center px-2 h-9 w-full font-secondary gap-2 border-b border-gray-300";

export default function HamburgerProfile() {
  const { setLoading } = useSelfContext();
  const router = useRouter();

  async function logout() {
    setLoading(true);

    const result = await signOut({
      redirect: false,
    });

    if (result?.url) {
      router.push("/login");
    } else {
      setLoading(false);
      console.log("Erro ao desconectar");
    }
  }

  async function editProfile() {
    setLoading(true);
    router.push("/pages/edit-profile-petter");
  }

  return (
    <div className="absolute right-0 w-40 bg-branco border border-gray-300 rounded-lg">
      <ul>
        <li className={`${styleLi}`} onClick={editProfile}>
          <Image
            src="/images/edit.png"
            width={24}
            height={24}
            alt="Logout"
            className="h-auto w-auto"
          />
          Editar Perfil
        </li>
        <li className={`${styleLi}`}></li>
        <li className={`${styleLi}`} onClick={logout}>
          <Image
            src="/images/logout.png"
            width={24}
            height={24}
            alt="Logout"
            className="h-auto w-auto"
          />
          Desconectar
        </li>
      </ul>
    </div>
  );
}
