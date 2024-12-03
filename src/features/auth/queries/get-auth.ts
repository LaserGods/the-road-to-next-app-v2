"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { validateSessionToken } from "@/lib/session";

export const getAuth = cache(async () => {
  const token = (await cookies()).get("session")?.value ?? null;

  if (token === null) {
    return { user: null, session: null };
  }

  const result = await validateSessionToken(token);
  return result;
});
