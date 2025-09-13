import { useEffect, useRef } from "react";
import { ActionState } from "@/components/form/utils/to-action-state";

// Arguments passed to the onSuccess/onError callbacks
type OnArgs = {
  actionState: ActionState;
};

// Options for the useActionFeedback hook
type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void; // Called when actionState is SUCCESS
  onError?: (onArgs: OnArgs) => void; // Called when actionState is ERROR
};

/**
 * Custom React hook to provide feedback (callbacks) based on ActionState changes.
 * Triggers onSuccess or onError when the actionState's timestamp changes and status matches.
 *
 * @param actionState - The current state of the action (with status and timestamp)
 * @param options - Callback functions for success and error states
 */
const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions,
) => {
  // Store the previous timestamp to detect changes
  const prevTimestamp = useRef(actionState.timestamp);

  // Determine if the actionState has been updated
  const isUpdate = prevTimestamp.current !== actionState.timestamp;

  useEffect(() => {
    // Only run effect if there is an update
    if (!isUpdate) return;

    // Call onSuccess if the action completed successfully
    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }

    // Call onError if the action failed
    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }

    // Update the previous timestamp for the next render
    prevTimestamp.current = actionState.timestamp;
  }, [isUpdate, actionState, options]);
};

export { useActionFeedback };
