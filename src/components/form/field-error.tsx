import { ActionState } from "@/components/form/utils/to-action-state";
import { cn } from "@/lib/utils";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
  className?: string;
};

const FieldError = ({ actionState, name, className }: FieldErrorProps) => {
  const message = actionState.fieldErrors[name]?.[0];

  if (!message) return null;

  return (
    <span
      data-slot="field-error"
      id={`${name}-error`}
      aria-live="polite"
      className={cn("text-destructive text-xs", className)}
    >
      {message}
    </span>
  );
};

export { FieldError };
