import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthProvider from "@/lib/next.auth.proivder";
import { TrackContextProvider } from "@/lib/track.wrapper";
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
