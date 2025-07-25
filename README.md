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
