import { S3Client } from "@aws-sdk/client-s3";
import { awsCredentialsProvider } from "@vercel/functions/oidc";

const getRoleArn = () => {
  if (process.env.VERCEL_ENV === "production") {
    return process.env.AWS_ROLE_ARN;
  }
  return process.env.AWS_ROLE_ARN_DEV;
};

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: awsCredentialsProvider({
    roleArn: getRoleArn(),
    roleSessionName: `vercel-${process.env.VERCEL_ENV || "development"}`,
    clientConfig: {
      region: process.env.AWS_BUCKET_REGION,
    },
  }),
});

export { s3 };
