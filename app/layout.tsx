import type { Metadata } from "next";
import "./globals.css";
import AppLayout from "./appLayout";

export const metadata: Metadata = {
    title: "Giang | Web Developer",
    description: "My NextJS project!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AppLayout>
            {children}
        </AppLayout>
    );
}
