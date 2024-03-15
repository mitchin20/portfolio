import NavBar from "./components/navbar/NavBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        <html lang="en" data-theme="wireframe">
            <body className={`${inter.className} bg-[url('/images/bg.jpg')] bg-cover bg-no-repeat`}>
                <NavBar />
                {children}
            </body>
        </html>
    );
}
