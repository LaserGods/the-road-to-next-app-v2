"use server";

import { redirect } from "next/navigation";
import { invalidateSessionToken } from "@/lib/session";
import { signInPath } from "@/paths";
import { getAuth } from "../queries/get-auth";
import { deleteSessionCookie } from "../utils/session-cookie";

export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath());
  }

  await invalidateSessionToken(session.id);

  await deleteSessionCookie();

  redirect(signInPath());
};
