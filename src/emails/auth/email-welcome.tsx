import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type EmailWelcomeProps = {
  toName: string;
  loginUrl: string;
};

//   const baseUrl = process.env.VERCEL_URL
//     ? `https://${process.env.VERCEL_URL}`
//     : '';

export const EmailWelcome = ({ toName, loginUrl }: EmailWelcomeProps) => {
  const previewText = `Welcome to TicketBounty, ${toName}!`;

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto px-[24px] font-sans">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto my-[32px] max-w-[420px]">
            <Section className="mt-[32px] text-center">
              <Text className="text-[18px] text-black">
                Hi <strong>{toName}</strong>, welcome to{" "}
                <strong>TicketBounty</strong>!
              </Text>
            </Section>
            <Section className="text-center">
              <Button
                href={loginUrl}
                className="rounded-[6px] bg-black p-[12px] font-bold text-white"
                target="_blank"
                type="button"
              >
                Get Started
              </Button>
            </Section>
            <Section className="text-center">
              <Hr className="mx-0 my-[24px] w-full border border-solid border-[#020618]" />
              <Text className="text-[16px] text-black">
                We&apos;re excited to have you on board. Let us know if you ever
                have questions!
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailWelcome.PreviewProps = {
  toName: "Jordan",
  loginUrl: "http://localhost:3000/sign-in",
} as EmailWelcomeProps;

export default EmailWelcome;
