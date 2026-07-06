import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subme – Where Fans Fuel Creators",
  description: "Subme is a creator-powered platform where fans can subscribe, support, and unlock exclusive content. Built for creators, artists, and influencers to monetize their passion and connect deeper with their audience.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
