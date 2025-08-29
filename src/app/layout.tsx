import ThemeRegistry from "@/components/theme-registry/theme.registry";
import AppHeader from "./component/header/app.header";
import AppFooter from "./component/footer/app.footer";
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
          <NextAuthProvider>
            <AppHeader />
            {children}
            <AppFooter />
          </NextAuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
