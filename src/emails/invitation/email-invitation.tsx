import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type EmailInvitationProps = {
  fromUser: string;
  fromOrganization: string;
  url: string;
};

const EmailInvitation = ({
  fromUser,
  fromOrganization,
  url,
}: EmailInvitationProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="m-8 bg-white text-center font-sans">
          <Preview>
            Invitation to join {fromOrganization} on TicketBounty
          </Preview>
          <Container>
            <Section>
              <Text className="text-sm">
                Hello there, <strong>{fromUser}</strong> invited you to join{" "}
                <strong>{fromOrganization}</strong>.
              </Text>
              <Text className="mt-4 text-sm">
                Click the link below to accept the invitation.
              </Text>
            </Section>
            <Section>
              <Button
                href={url}
                className="m-2 rounded-lg bg-black p-2 text-center align-middle text-white"
              >
                Accept Invitation
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailInvitation.PreviewProps = {
  fromUser: "Robin Wieruch",
  fromOrganization: "TicketBounty",
  url: "http://localhost:3000/email-invitation/abc123",
} as EmailInvitationProps;

export default EmailInvitation;
