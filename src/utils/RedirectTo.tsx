"use client";

import { getSession } from "next-auth/react";
import { setItem } from "./localStorageUtils";

export default async function redirectTo(router: any) {
  const session = await getSession();
  const user = session?.user;

  if (user?.accessToken) {
    setItem("token", user.accessToken);

    if (!user.userInfo) {
      router.replace("/register-infos");
    } else if (user.petterInfo && user.petterInfo.length === 0) {
      router.replace("/notice");
    } else {
      router.replace("/home");
    }
  } else {
    router.replace("/login");
  }

  return router;
}
