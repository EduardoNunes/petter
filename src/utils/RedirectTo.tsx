import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default async function redirectToProperPage() {
  const router = useRouter();
  const session = await getSession();
  const user = session?.user;
  
  if (user) {
    if (!user.userInfo) {
      router.push("/register-infos");
    } else if (user.petterInfo.length === 0) {
      router.push("/notice");
    } else {
      router.push("/home");
    }
  }
}
