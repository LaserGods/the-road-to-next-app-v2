# My Ticket Bounty App from The Road to Next - A Course by Robin Wieruch

## The Road to Next (Basic)

### Authentication

Start with the basics of authentication. We use [Lucia](https://lucia-auth.com/) for authentication.
After learning the basics using Lucia, we migrate to [Oslo](https://oslojs.dev/) for authentication.

#### Replace Lucia

[Migrate from Lucia v3](https://lucia-auth.com/sessions/migrate-lucia-v3)

**Basic API - _Sessions with Prisma_**

[Link to documentation]<https://lucia-auth.com/sessions/basic-api/prisma>

## The Road to Next (Pro)

### Password Reset

Two primary use cases:

1. Forgot password
2. Change password

TODO:

Basic Checks:

1. Is email verified?
2. Is temporary one-time password configured?
3. Is 2fa configured?
4. Is password complexity configured?
5. Is password history configured?

UI Elements:

[ ] Implement forgot password page
[ ] Forgot password form for existing users
[ ] Chage password form on the the users account page
[ ] Other UI elements?

Actions and Flows:

1. Forgot password flow - redirect user to password forgot page - send email with short-livedreset token
2. Reset password flow - user goes to account password page and requests a password reset token - user will receive email with reset token

Backend Considerations:

- How do we handle the reset token?
- How do we handle the reset token expiration?
- How do we handle password reset sessions and expiration?

Database Design:

[ ] Password reset session table
[ ] Email verification request table
