"use client";

import { LucidePlus } from "lucide-react";
import { useActionState, useState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createInvitation } from "../actions/create-invitation";

type InvitationCreateButtonProps = {
  organizationId: string;
};

const InvitationCreateButton = ({
  organizationId,
}: InvitationCreateButtonProps) => {
  const [open, setOpen] = useState(false);

  const [actionState, action] = useActionState(
    createInvitation.bind(null, organizationId),
    EMPTY_ACTION_STATE,
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <LucidePlus className="size-4" />
          Invite Member
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Invite a new member to your organization
          </DialogDescription>
        </DialogHeader>
        <Form
          action={action}
          actionState={actionState}
          onSuccess={handleClose}
          className="flex flex-col gap-y-4"
        >
          <Field orientation={"horizontal"} className="w-full">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="newMember@example.com"
              autoComplete="email"
              className="w-full"
            />
          </Field>
          <FieldError actionState={actionState} name="email" />
          <DialogFooter>
            <Button type="button" variant={"outline"} onClick={handleClose}>
              Cancel
            </Button>
            <SubmitButton label="Invite" />
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { InvitationCreateButton };
