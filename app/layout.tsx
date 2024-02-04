import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/providers/SessionWraper";
import EditModal from "@/components/modals/EditModal";
import TanStackProvider from "@/providers/TanStackProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TanStackProvider>
          <Toaster />
          <EditModal />
          <RegisterModal />
          <LoginModal />
          <Layout>
            {children}
          </Layout>
          </TanStackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}