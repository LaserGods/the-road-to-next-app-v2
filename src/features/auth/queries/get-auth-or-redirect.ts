import { redirect } from "next/navigation";
import { getAuth } from "@/features/auth/queries/get-auth";
import { emailVerificationPath, signInPath } from "@/paths";

export const getAuthOrRedirect = async () => {
  const auth = await getAuth();

  if (!auth.user) {
    redirect(signInPath());
  }

  if (!auth.user.emailVerified) {
    redirect(emailVerificationPath());
  }

  return auth;
};
