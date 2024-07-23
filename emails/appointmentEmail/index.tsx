import {
    Body,
    Container,
    Column,
    Head,
    Html,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface Appointment {
    id: number;
    subject: string;
    technicianId: number;
    technicianName: string;
    customerName: string;
    nickName: string;
    customerPhone: string;
    customerEmail: string;
    selectedDate: string;
    selectedTime: string;
    services: string[];
    note: string;
    endTime: Date;
    startTime: Date;
}

interface AppointmentEmailProps {
    data: Appointment;
}
  
export const AppointmentEmail = ({
    data
}: AppointmentEmailProps) => (
    <Html>
        <Head />
        <Preview>
            Hello there! You are testing out Giang Nguyen Portfolio Bookme - a scheduling application.
        </Preview>

        <Body style={main}>
            <Container style={container}>
                <Section>
                    <Text>
                        Dear {data.customerName},
                    </Text>
                    <Text>
                        Thank you for scheduling an appointment with us. We are pleased to confirm your appointment as per the details below:
                    </Text>
                </Section>
                <Section>
                    <Text>
                        Appointment Details:
                    </Text>
                </Section>
                <Section style={informationTable}>
                    <Row style={informationTableRow}>
                        <Column colSpan={2}>
                            <Section>
                                <Row>
                                    <Column style={informationTableColumn}>
                                        <Text style={informationTableLabel}>
                                            APPOINTMENT WITH
                                        </Text>
                                        <Text
                                            style={{
                                                ...informationTableValue,
                                                color: "#15c",
                                            }}
                                        >
                                            {data.technicianName}
                                        </Text>
                                    </Column>
                                </Row>

                                <Row>
                                    <Column style={informationTableColumn}>
                                        <Text style={informationTableLabel}>
                                            ON
                                        </Text>
                                        <Text style={informationTableValue}>
                                            {data.startTime.toLocaleString('en-US', {
                                                weekday: 'short',
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                                timeZone: 'UTC'
                                            })}
                                        </Text>
                                    </Column>
                                </Row>

                                <Row>
                                    <Column style={informationTableColumn}>
                                        <Text style={informationTableLabel}>
                                            AT
                                        </Text>
                                        <Text
                                            style={{
                                                ...informationTableValue,
                                                color: "#15c",
                                            }}
                                        >
                                            {data.startTime.toLocaleString('en-US', {
                                                timeStyle: 'short',
                                                timeZone: 'UTC'
                                            })}
                                        </Text>
                                    </Column>
                                </Row>
                            </Section>
                        </Column>
                        <Column style={informationTableColumn} colSpan={2}>
                            <Text style={informationTableLabel}>
                                BEAUTY SALON
                            </Text>
                            <Text style={informationTableValue}>
                                123 Woodland Ave
                            </Text>
                            <Text style={informationTableValue}>
                                San Francisco, CA 94123
                            </Text>
                            <Text style={informationTableValue}>
                                USA
                            </Text>
                        </Column>
                    </Row>
                </Section>
                <Section style={productTitleTable}>
                    <Text style={productsTitle}>Appointment For:</Text>
                </Section>
                <Section>
                    <Row>
                        <Column style={{ paddingLeft: "22px" }}>
                            {data.services.map((service, index) => (
                                <Text key={index} style={productTitle}>
                                    {service}
                                </Text>
                            ))}
                        </Column>
                    </Row>
                </Section>

                <Section>
                    <Text>
                        Thank you,
                    </Text>
                    <Text>
                        See you soon.
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default AppointmentEmail;

const main = {
fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
backgroundColor: "#ffffff",
};

const resetText = {
margin: "0",
padding: "0",
lineHeight: 1.4,
};

const container = {
margin: "0 auto",
padding: "20px 0 48px",
width: "660px",
maxWidth: "100%",
};

const tableCell = { display: "table-cell" };

const heading = {
fontSize: "32px",
fontWeight: "300",
color: "#888888",
};

const cupomText = {
textAlign: "center" as const,
margin: "36px 0 40px 0",
fontSize: "14px",
fontWeight: "500",
color: "#111111",
};

const supStyle = {
fontWeight: "300",
};

const informationTable = {
borderCollapse: "collapse" as const,
borderSpacing: "0px",
color: "rgb(51,51,51)",
backgroundColor: "rgb(250,250,250)",
borderRadius: "3px",
fontSize: "12px",
};

const informationTableRow = {
height: "46px",
};

const informationTableColumn = {
paddingLeft: "20px",
borderStyle: "solid",
borderColor: "white",
borderWidth: "0px 1px 1px 0px",
height: "44px",
};

const informationTableLabel = {
...resetText,
color: "rgb(102,102,102)",
fontSize: "10px",
};

const informationTableValue = {
fontSize: "12px",
margin: "0",
padding: "0",
lineHeight: 1.4,
};

const productTitleTable = {
...informationTable,
margin: "30px 0 15px 0",
height: "24px",
};

const productsTitle = {
background: "#fafafa",
paddingLeft: "10px",
fontSize: "14px",
fontWeight: "500",
margin: "0",
};

const productIcon = {
margin: "0 0 0 20px",
borderRadius: "14px",
border: "1px solid rgba(128,128,128,0.2)",
};

const productTitle = { fontSize: "12px", fontWeight: "600", ...resetText };

const productDescription = {
fontSize: "12px",
color: "rgb(102,102,102)",
...resetText,
};

const productLink = {
fontSize: "12px",
color: "rgb(0,112,201)",
textDecoration: "none",
};

const divisor = {
marginLeft: "4px",
marginRight: "4px",
color: "rgb(51,51,51)",
fontWeight: 200,
};

const productPriceTotal = {
margin: "0",
color: "rgb(102,102,102)",
fontSize: "10px",
fontWeight: "600",
padding: "0px 30px 0px 0px",
textAlign: "right" as const,
};

const productPrice = {
fontSize: "12px",
fontWeight: "600",
margin: "0",
};

const productPriceLarge = {
margin: "0px 20px 0px 0px",
fontSize: "16px",
fontWeight: "600",
whiteSpace: "nowrap" as const,
textAlign: "right" as const,
};

const productPriceWrapper = {
display: "table-cell",
padding: "0px 20px 0px 0px",
width: "100px",
verticalAlign: "top",
};

const productPriceLine = { margin: "30px 0 0 0" };

const productPriceVerticalLine = {
height: "48px",
borderLeft: "1px solid",
borderColor: "rgb(238,238,238)",
};

const productPriceLargeWrapper = { display: "table-cell", width: "90px" };

const productPriceLineBottom = { margin: "0 0 75px 0" };

const block = { display: "block" };

const ctaTitle = {
display: "block",
margin: "15px 0 0 0",
};

const ctaText = { fontSize: "24px", fontWeight: "500" };

const walletWrapper = { display: "table-cell", margin: "10px 0 0 0" };

const walletLink = { color: "rgb(0,126,255)", textDecoration: "none" };

const walletImage = {
display: "inherit",
paddingRight: "8px",
verticalAlign: "middle",
};

const walletBottomLine = { margin: "65px 0 20px 0" };

const footerText = {
fontSize: "12px",
color: "rgb(102,102,102)",
margin: "0",
lineHeight: "auto",
marginBottom: "16px",
};

const footerTextCenter = {
fontSize: "12px",
color: "rgb(102,102,102)",
margin: "20px 0",
lineHeight: "auto",
textAlign: "center" as const,
};

const footerLink = { color: "rgb(0,115,255)" };

const footerIcon = { display: "block", margin: "40px 0 0 0" };

const footerLinksWrapper = {
margin: "8px 0 0 0",
textAlign: "center" as const,
fontSize: "12px",
color: "rgb(102,102,102)",
};

const footerCopyright = {
margin: "25px 0 0 0",
textAlign: "center" as const,
fontSize: "12px",
color: "rgb(102,102,102)",
};

const walletLinkText = {
fontSize: "14px",
fontWeight: "400",
textDecoration: "none",
};
  