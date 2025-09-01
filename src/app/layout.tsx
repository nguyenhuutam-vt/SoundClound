import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthProvider from "@/lib/next.auth.proivder";
import { TrackContextProvider } from "@/lib/track.wrapper";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Layout Page",
  description: "mieu ta",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthProvider>
            <TrackContextProvider>{children}</TrackContextProvider>
          </NextAuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
