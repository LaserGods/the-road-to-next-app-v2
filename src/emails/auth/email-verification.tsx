import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Text,
} from "@react-email/components";

type EmailVerificationProps = {
  toName: string;
  code: string;
};

const EmailVerification = ({ toName, code }: EmailVerificationProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Body style={body}>
        <Container>
          <Section>
            <Text>
              Hello <strong>{toName}</strong>, please verify your email address
              by entering the following code in the app:
            </Text>
          </Section>
          <Section>
            <Text style={verificationCode}>{code}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

EmailVerification.PreviewProps = {
  toName: "Jordan",
  code: "ABCDEFGH",
} as EmailVerificationProps;

export default EmailVerification;

const body: React.CSSProperties = {
  margin: "32px",
  textAlign: "center",
  fontFamily: "sans-serif",
  fontSize: "16px",
  lineHeight: "24px",
};

const verificationCode: React.CSSProperties = {
  width: "max-content",
  display: "inline-block",
  margin: "8px",
  padding: "8px",
  backgroundColor: "black",
  color: "white",
  borderRadius: "4px",
  fontFamily: "monospace",
  fontWeight: "bold",
  fontSize: "20px",
  letterSpacing: "2px",
};
