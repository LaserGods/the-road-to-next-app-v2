import { cookies } from "next/headers";

export const setSessionCookie = async (
  sessionToken: string,
  expiresAt: Date,
) => {
  const cookie = {
    name: "session",
    value: sessionToken,
    attributes: {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      expires: expiresAt,
    },
  };

  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
};

export const deleteSessionCookie = async () => {
  const cookie = {
    name: "session",
    value: "",
    attributes: {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 0,
    },
  };
  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
};
