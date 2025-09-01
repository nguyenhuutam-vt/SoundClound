import AppHeader from "../component/header/app.header";
import AppFooter from "../component/footer/app.footer";
import type { Metadata } from "next";
import Script from 'next/script'

export const metadata: Metadata = {
  title: "Layout",
  description: "mieu ta",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <>
        <AppHeader />
        {children}
        <div style={{ marginBottom: "90px" }}></div>
        <AppFooter />
      </>
    </html>
  );
}
