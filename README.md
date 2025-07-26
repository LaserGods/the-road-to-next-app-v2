# My Ticket Bounty App from The Road to Next - A Course by Robin Wieruch

> Thanks for checking out the app! This is a demo app I built while completing The Road to Next course by Robin Wieruch. The app is functional, but not production ready. Please do not submit any sensitive data or pay any bounties. Due to the nature of the app, your tickets and account could be deleted at any time. If you have any questions, or concerns please [create an issue](https://github.com/LaserGods/the-road-to-next-app-v2/issues) on GitHub. Thanks again and stay tuned for more updates!

---

## Notes From Course

### The Road to Next (Basic)

#### Authentication

Start with the basics of authentication. We use [Lucia](https://lucia-auth.com/) for authentication.
After learning the basics using Lucia, we migrate to [Oslo](https://oslojs.dev/) for authentication.

##### Replace Lucia

[Migrate from Lucia v3](https://lucia-auth.com/sessions/migrate-lucia-v3)

**Basic API - _Sessions with Prisma_**

[Link to documentation](https://lucia-auth.com/sessions/basic-api/prisma)

---

### The Road to Next (Pro)

#### Password Reset

Two primary use cases:

1. Forgot password
2. Change password

Basic Checks:

1. Is email verified?
2. Is temporary one-time password configured?
3. Is 2fa configured?
4. Is password complexity configured?
5. Is password history configured?

UI Elements:

- [x] Implement forgot password page
- [x] Forgot password form for existing users
- [x] Chage password form on the the users account page
- [ ] Other UI elements (Password strength meter)?

Actions and Flows:

1. Forgot password flow - redirect user to the public password forgot page - send email with short-lived reset token
2. Change password flow - user goes to protected account password page and requests a password reset token - user will receive email with short-lived reset token

Backend Considerations:

- How do we handle the reset token?
- How do we handle the reset token expiration?
- How do we handle password reset sessions and expiration?

Database Design:

- [x] Password reset session table
- [x] Email verification request table

#### Email

Our immediate use case is sending a unique password reset link/token to the user.

Other authentication use cases include:

1. Sending a unique email verification code to the user.
2. Adding basic 2FA support.
3. Allowing the user to change their email address.
4. Allowing the user to have multiple email addresses.

Prerequisites:

- [x] Purchase a domain name for sending emails

Implementation:

- [x] Add [react email](https://react.email/) library for creating email templates using React and TypeScript
- [x] Implement email sending service with [Resend](https://resend.com/)
- [x] Connect your domain to Resend by adding the DNS records to your domain registrar

#### Message Queue

A message queue is a separate server that handles background tasks, such as sending emails, processing data, etc. It allows us to offload tasks from the main application server, improving performance and reliability.

Implementation:

- [x] Add [Inngest](https://www.inngest.com/), create an Inngest client, and set up a route handler
- [x] Run the Inngest development server
- [x] Create an Inngest function to send password reset emails
- [x] Connect Inngest and Vercel - [Link to documentation](https://www.inngest.com/docs/deploy/vercel)

#### Email Verification

Email verification is a process that ensures the user owns the email address they provided during registration. It is part of the larger onboarding flow.

Email verification flow:

1. User registers with an email address.
2. Generate a unique short-lived verification token, hash it, and store it in the database.
3. Send an email to the user with the code and instructions to verify their email address.
4. User enters the code on the verification page.
5. Verify the code by comparing it with the hashed token in the database.
6. Verify the code has not expired.
7. If the code is valid, mark the email as verified in the database, and create a new session for the user.

#### Organizations

Organizations are a way to group users together. They can be used for teams, companies, or any other grouping of users and resources.
Organizations can have multiple users, and users can belong to multiple organizations.
