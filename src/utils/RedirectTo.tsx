"use client";

import { getSession } from "next-auth/react";
import { setItem } from "./localStorageUtils";

export default async function redirectTo(router: any) {
  const session = await getSession();
  const user = session?.user;

  if (user) {
    setItem("token", user.accessToken);

    if (!user.userInfo) {
      router.push("/register-infos");
    } else if (user.petterInfo.length === 0) {
      router.push("/notice");
    } else {
      router.push("/home");
    }
  } else {
    router.push("/login");
  }

  return router;
}
