"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signUp } from "../actions/sign-up";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Input
        type="text"
        aria-label="Username"
        name="username"
        placeholder="Username"
        defaultValue={actionState.payload?.get("username") as string}
        required
      />
      <FieldError actionState={actionState} name="username" />

      <Input
        type="email"
        autoComplete="email"
        aria-label="Email"
        name="email"
        placeholder="Email"
        defaultValue={actionState.payload?.get("email") as string}
        required
      />
      <FieldError actionState={actionState} name="email" />

      <Input
        type="password"
        autoComplete="new-password"
        aria-label="Password"
        name="password"
        placeholder="Password"
        defaultValue={actionState.payload?.get("password") as string}
        required
      />
      <FieldError actionState={actionState} name="password" />

      <Input
        type="password"
        autoComplete="new-password"
        aria-label="Confirm Password"
        name="confirmPassword"
        placeholder="Confirm Password"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
        required
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export { SignUpForm };
