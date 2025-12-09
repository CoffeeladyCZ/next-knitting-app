// Root layout is empty because we use [locale]/layout.tsx as the main layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
