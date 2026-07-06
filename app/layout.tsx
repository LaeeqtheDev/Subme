import { ClerkProvider } from "@clerk/nextjs";
import { SanityLive } from "@/sanity/lib/live";
import SchematicProvider from "@/components/Schematic/SchematicProvider";
import { Toaster } from "sonner";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SchematicProvider>
            {children}
            <Toaster position="bottom-right" />
          </SchematicProvider>
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
