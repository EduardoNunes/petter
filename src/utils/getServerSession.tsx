import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../app/api/auth/[...nextauth]/route";

export async function getServerSessionData() {
  return await getServerSession(nextAuthOptions);
}
