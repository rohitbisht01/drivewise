import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const recursive = Recursive({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DriveWise",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${recursive.className}`}>
          <Header />
          <main className="min-h-screen bg-gray-200">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
