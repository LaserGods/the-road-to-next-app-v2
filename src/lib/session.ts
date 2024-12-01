import { hashToken } from "@/utils/crypto";
import { prisma } from "./prisma";

const SESSION_REFRESH_INTERVAL = 1000 * 60 * 60 * 24 * 15; // 15 days
const SESSION_MAX_AGE = 1000 * 60 * 60 * 24 * 30; // 30 days

export const createSessionToken = async (
  sessionToken: string,
  userId: string,
) => {
  const sessionId = hashToken(sessionToken);
  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_MAX_AGE),
  };

  await prisma.session.create({
    data: session,
  });

  return session;
};

export const validateSessionToken = async (sessionToken: string) => {
  const sessionId = hashToken(sessionToken);

  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  if (!result) {
    return { session: null, user: null };
  }

  const { user, ...session } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });

    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - SESSION_REFRESH_INTERVAL) {
    // set new expiresAt
    session.expiresAt = new Date(Date.now() + SESSION_MAX_AGE);

    // update session in database
    await prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }
  return { session, user };
};

export const invalidateSessionToken = async (sessionId: string) => {
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
};
