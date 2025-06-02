import { prisma } from "@/lib/prisma";
import { generateRandomCode } from "@/utils/crypto";

const EMAIL_VERIFICATION_TOKEN_LIFETIME_MS = 15 * 60 * 1000; // 15 minutes

export const generateEmailVerificationCode = async (
  userId: string,
  email: string,
) => {
  await prisma.emailVerificationToken.deleteMany({
    where: {
      userId,
    },
  });

  const code = generateRandomCode();

  await prisma.emailVerificationToken.create({
    data: {
      code,
      userId,
      email,
      expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TOKEN_LIFETIME_MS),
    },
  });

  return code;
};
