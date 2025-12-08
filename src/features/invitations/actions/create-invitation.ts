"use server";

import { revalidatePath } from "next/cache";
import z from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getPermissionOrRedirect } from "@/features/permission/queries/get-permission-or-redirect";
import { prisma } from "@/lib/prisma";
import { invitationsPath } from "@/paths";

const createInvitationSchema = z.object({
  email: z.email({ error: "Please provide a valid email address." }),
});

export const createInvitation = async (
  organizationId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  await getPermissionOrRedirect({
    organizationId,
    permissionKey: "invitation:create",
  });

  try {
    const { email } = createInvitationSchema.parse({
      email: formData.get("email"),
    });

    const targetMembership = await prisma.membership.findFirst({
      where: {
        organizationId,
        user: {
          email,
        },
      },
    });

    if (targetMembership) {
      return toActionState(
        "ERROR",
        "User is already a member of the organization.",
      );
    }

    // TODO: Invite user by email link
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(invitationsPath(organizationId));

  return toActionState("SUCCESS", "User invited successfully.");
};
