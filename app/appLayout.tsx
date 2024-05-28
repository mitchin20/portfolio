'use client';

import { useEffect } from "react";
import { ReduxProvider } from "@/redux/ReduxProvider";
import { Inter } from "next/font/google";
import { detectUserSession } from "./useDetectUserSession";

const inter = Inter({ subsets: ["latin"] });

export default function AppLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    useEffect(() => {
        detectUserSession();
    }, [])

    return (
        <ReduxProvider>
            <html lang="en" data-theme="wireframe">
                {/* bg-[url('/images/bg.jpg')] bg-cover bg-no-repeat */}
                <body className={`${inter.className} overflow-x-hidden`} >
                    {children}
                </body>
            </html>
        </ReduxProvider>
    )
}