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

interface WelcomeEmailProps {
    userFirstname: string;
    email: string;
    code: string;
}

const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL
    ? `https://${process.env.NEXT_PUBLIC_ROOT_URL}`
    : "";

export const WelcomeEmail = ({
    userFirstname,
    email,
    code
}: WelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>
            Hi there! You&apos;ve entered Giang Nguyen Portfolio. Dive into my world
            of innovative code and inspiring solutions. Happy browsing!
        </Preview>
        <Body style={main}>
            <Container style={container}>
                {/* <Img
            src={`${baseUrl}/static/koala-logo.png`}
            width="170"
            height="50"
            alt="Koala"
            style={logo}
          /> */}
                <Text style={paragraph}>Hi {userFirstname},</Text>
                <Text style={paragraph}>
                    Please verify your email address
                </Text>
                <Text style={paragraph}>
                    Verification code: {code}
                </Text>
                <Text style={paragraph}>
                    (This code is valid for 15 minutes)
                </Text>
                <Text style={paragraph}>
                    If you didn&apos;t request this email, there&apos;s nothing to worry about, you can safely ignore it.
                </Text>
                <Text style={paragraph}>
                    Best,
                    <br />
                    The Website Admin
                </Text>
            </Container>
        </Body>
    </Html>
);

export default WelcomeEmail;

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
