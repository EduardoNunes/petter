"use client";

import { getSession } from "next-auth/react";

export default async function redirectTo(router: any) {
  const session = await getSession();
  const user = session?.user;

  if (user?.accessToken) {
    if (!user.userInfo) {
      router.replace("/registers/register-infos");
    } else if (user.petterInfo && user.petterInfo.length === 0) {
      router.replace("/registers/notice");
    } else {
      router.replace("/pages/home");
    }
  } else {
    router.replace("/login");
  }

  return router;
}
