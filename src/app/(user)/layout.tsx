
import AppHeader from "../component/header/app.header";
import AppFooter from "../component/footer/app.footer";
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
        <AppFooter />
      </>
    </html>
  );
}
