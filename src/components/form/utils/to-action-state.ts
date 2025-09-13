import { ZodError } from "zod";

// Type representing the state of an action, such as form submission
// T is the type of any additional data returned with the action
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionState<T = any> = {
  status?: "SUCCESS" | "ERROR"; // Status of the action
  message: string; // Message describing the result
  payload?: FormData; // Optional form data associated with the action
  fieldErrors: Record<string, string[] | undefined>; // Field-level validation errors
  timestamp: number; // Timestamp of when the action occurred
  data?: T; // Optional additional data
};

// An empty/default action state object
export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};

/**
 * Converts an error (ZodError, Error, or unknown) to an ActionState object.
 * Used to standardize error handling for form actions.
 *
 * @param error - The error to convert
 * @param formData - Optional form data associated with the error
 * @returns ActionState representing the error
 */
export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData,
): ActionState => {
  if (error instanceof ZodError) {
    // Handle validation errors from Zod
    return {
      status: "ERROR",
      message: "",
      payload: formData,
      fieldErrors: error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    // Handle general JS errors
    return {
      status: "ERROR",
      message: error.message,
      payload: formData,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  } else {
    // Handle unknown errors
    return {
      status: "ERROR",
      message: "An unknown error occurred",
      payload: formData,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  }
};

/**
 * Creates an ActionState object for a given status and message.
 * Used to standardize success and error responses for actions.
 *
 * @param status - The status of the action ("SUCCESS" or "ERROR")
 * @param message - Message describing the result
 * @param formData - Optional form data associated with the action
 * @param data - Optional additional data to include
 * @returns ActionState representing the result
 */
export const toActionState = (
  status: ActionState["status"],
  message: string,
  formData?: FormData,
  data?: unknown,
): ActionState => {
  return {
    status,
    message,
    fieldErrors: {},
    payload: formData,
    timestamp: Date.now(),
    data,
  };
};
