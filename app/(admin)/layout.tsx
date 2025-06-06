import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";



export const metadata: Metadata = {
  title: "Subme- Admin Dashboard",
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
      <body
       
      >
    
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
