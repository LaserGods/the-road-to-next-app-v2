export const accountPasswordPath = () => "/account/password";
export const accountProfilePath = () => "/account/profile";

export const commentEditPath = (ticketId: string, commentId: string) =>
  `/tickets/${ticketId}/${commentId}/edit`;

export const emailVerificationPath = () => "/email-verification";

export const homePath = () => "/";

export const onboardingPath = () => "/onboarding";

export const organizationCreatePath = () => "/organization/create";
export const organizationsPath = () => "/organization";

export const passwordForgotPath = () => "/password-forgot";
export const passwordResetPath = () => "/password-reset";

export const selectActiveOrganizationPath = () =>
  "/onboarding/select-active-organization";

export const signInPath = () => "/sign-in";
export const signUpPath = () => "/sign-up";

export const ticketEditPath = (ticketId: string) => `/tickets/${ticketId}/edit`;
export const ticketPath = (ticketId: string) => `/tickets/${ticketId}`;
export const ticketsPath = () => "/tickets";
