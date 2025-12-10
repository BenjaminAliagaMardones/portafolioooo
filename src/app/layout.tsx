import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "'Ubuntu Sans Bold', sans-serif" }}>{children}</body>
    </html>
  );
}
