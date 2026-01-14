import WalletWatcher from "@/components/WalletWatcher";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletWatcher />
        {children}
      </body>
    </html>
  );
}
