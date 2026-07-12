import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import { render } from "@react-email/components";
import { awsCredentialsProvider } from "@vercel/functions/oidc";
import type { ReactElement } from "react";

const getRoleArn = () => {
  if (process.env.VERCEL_ENV === "production") {
    return process.env.AWS_ROLE_ARN;
  }
  return process.env.AWS_ROLE_ARN_DEV;
};

const ses = new SESClient({
  region: process.env.AWS_SES_REGION,
  credentials: awsCredentialsProvider({
    roleArn: getRoleArn(),
    roleSessionName: `vercel-${process.env.VERCEL_ENV || "development"}`,
    clientConfig: {
      region: process.env.AWS_SES_REGION,
    },
  }),
});

type SendEmailParams = {
  from: string;
  to: string;
  subject: string;
  react: ReactElement;
};

// Mirrors the Resend `emails.send` result shape ({ data, error }) so callers
// can keep their existing error handling after the migration to AWS SES.
export const sendEmail = async ({
  from,
  to,
  subject,
  react,
}: SendEmailParams) => {
  try {
    const html = await render(react);

    const response = await ses.send(
      new SendEmailCommand({
        Source: from,
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Subject: {
            Charset: "UTF-8",
            Data: subject,
          },
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: html,
            },
          },
        },
      }),
    );

    return { data: { id: response.MessageId ?? null }, error: null };
  } catch (error) {
    const normalized =
      error instanceof Error ? error : new Error("Failed to send email.");

    return {
      data: null,
      error: { name: normalized.name, message: normalized.message },
    };
  }
};
