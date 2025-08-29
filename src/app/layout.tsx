import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthProvider from "@/lib/next.auth.proivder";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthProvider>{children}</NextAuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
