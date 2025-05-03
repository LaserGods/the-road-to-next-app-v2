import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Section,
  Text,
} from "@react-email/components";

type EmailPasswordResetProps = {
  toName: string;
  url: string;
};

const EmailPasswordReset = ({ toName, url }: EmailPasswordResetProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Body style={body}>
        <Container>
          <Section>
            <Text>
              Hello {toName}, you have requested a password reset. Please click
              the button below to reset your password.
            </Text>
          </Section>
          <Section>
            <Button href={url} style={button}>
              Reset Password
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

EmailPasswordReset.PreviewProps = {
  toName: "Jordan",
  url: "http://localhost:3000/password-reset/abc123",
} as EmailPasswordResetProps;

export default EmailPasswordReset;

const body: React.CSSProperties = {
  margin: "32px",
  textAlign: "center",
  fontFamily: "sans-serif",
  fontSize: "16px",
  lineHeight: "24px",
};

const button: React.CSSProperties = {
  marginTop: "8px",
  marginInline: "auto",
  borderRadius: "6px",
  backgroundColor: "#000",
  padding: "8px",
  color: "#fff",
  textDecoration: "none",
  display: "inline-block",
  fontWeight: "bold",
  textAlign: "center",
  verticalAlign: "middle",
};
