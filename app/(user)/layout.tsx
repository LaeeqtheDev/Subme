import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/ui/Header";
import { SanityLive } from "@/sanity/lib/live";
import SchematicProvider from "@/components/Schematic/SchematicProvider";
import {Toaster} from "sonner"
import DMButton from "@/components/ui/DMButton";


export const metadata: Metadata = {
  title: "Subme – Where Fans Fuel Creators",
  description: "Subme is a creator-powered platform where fans can subscribe, support, and unlock exclusive content. Built for creators, artists, and influencers to monetize their passion and connect deeper with their audience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <SchematicProvider>
      <body
       
      >
        <Header />
        {children}

        <div className="fixed bottom-4 right-4">
          <DMButton />
        </div>

        <Toaster position="bottom-right" />
      </body>
      <SanityLive/>
      </SchematicProvider>
    </html>
    </ClerkProvider>
  );
}
