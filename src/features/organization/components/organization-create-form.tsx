"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrganization } from "../actions/create-organization";

const OrganizationCreateFormForm = () => {
  const [actionState, action] = useActionState(
    createOrganization,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="name">Name</Label>
      <Input
        name="name"
        defaultValue={actionState.payload?.get("name") as string}
        placeholder="Name"
      />
      <FieldError actionState={actionState} name="name" />

      <SubmitButton label="Create" />
    </Form>
  );
};

export { OrganizationCreateFormForm };
