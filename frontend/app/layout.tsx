import type { Metadata } from "next";

import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { AppNavbar } from "@/components/common/app-navbar";
import Footer from "@/components/common/footer";

export const metadata: Metadata = {
  title: "CardioML",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="CardioML" />
      </head>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppNavbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
