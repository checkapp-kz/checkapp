import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import {Toaster} from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "CheckApp",
  description: "Created by tg: @batrbekk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mt-[65px] lg:mt-[89px]">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
