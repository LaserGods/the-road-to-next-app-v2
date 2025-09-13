import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useActionFeedback } from "./hooks/use-action-feedback";
import { ActionState } from "./utils/to-action-state";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children: React.ReactNode;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
  className?: string;
};

const Form = ({
  action,
  actionState,
  children,
  onSuccess,
  onError,
  className,
}: FormProps) => {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }

      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }

      onError?.(actionState);
    },
  });

  return (
    <form
      data-slot="form"
      action={action}
      className={cn("flex flex-col gap-y-2", className)}
    >
      {children}
    </form>
  );
};

export { Form };
