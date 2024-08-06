import { getSession, signOut } from "next-auth/react";

async function fetchUserData(userId: number) {
  const response = await fetch(`http://localhost:3001/auth/user/${userId}`);

  if (response.ok) {    
    const user = await response.json();
    return user;
  } else {
    throw new Error("Failed to fetch user data");
  }
}

export async function refreshSession() {
  const session = await getSession();

  if (session?.user) {
    try {
      const updatedUser = await fetchUserData(session.user.id);
      
      return updatedUser;
      
    } catch (error) {
      console.error("Failed to refresh session:", error);
      /* await signOut(); */
    }
  }
}
