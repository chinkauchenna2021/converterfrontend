// import type { Metadata } from "next";
import localFont from "next/font/local";
import "../app/globals.css";

import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/ClientServerSide";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { NextUIProvider } from "@nextui-org/react";
import MainNavBar from "@/components/MainNavBar";
import { Metadata } from "next/types";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "lucide-react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Converter",
  description: "Convert documents and images for free",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <NextUIProvider>
            <MainNavBar />
            {children}
            <ToastContainer
              position="top-right"
              theme="dark"
              limit={10}
              icon={<Box size={20} color="#ffffff" />}
            />
          </NextUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
