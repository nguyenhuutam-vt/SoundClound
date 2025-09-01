import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthProvider from "@/lib/next.auth.proivder";
import NProgressWrapper from "@/lib/nprogress.wrapper";
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
          <NProgressWrapper>
            <NextAuthProvider>
              <TrackContextProvider>{children}</TrackContextProvider>
            </NextAuthProvider>
          </NProgressWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
