import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
    name: string;
    email: string;
    message: string;
}

const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL
    ? `https://${process.env.NEXT_PUBLIC_ROOT_URL}`
    : "";

export const ContactEmail = ({
    name,
    email,
    message
}: ContactEmailProps) => (
    <Html>
        <Head />
        <Preview>
            Message was sent by {name}.
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Text style={paragraph}>Message from {name},</Text>
                <Text style={paragraph}>
                    Email: {email}
                </Text>
                <Text style={paragraph}>
                    {message}
                </Text>
            </Container>
        </Body>
    </Html>
);

export default ContactEmail;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const logo = {
    margin: "0 auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const btnContainer = {
    textAlign: "center" as const,
};

const button = {
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
};
