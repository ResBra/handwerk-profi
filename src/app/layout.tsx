import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getThemeSettings } from "@/app/actions/theme";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HM-Profi – Hausmeisterservice & Möbelbau",
  description: "Professionelle Hausmeisterdienstleistungen und individueller Möbelbau. Ihr zuverlässiger Partner für Rundum-Service und handwerkliche Qualität.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getThemeSettings();

  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {theme && (
          <style dangerouslySetInnerHTML={{ __html: `
            :root {
              --primary-light: ${theme.gradientStart};
              --primary: ${theme.gradientEnd};
              --primary-gradient: linear-gradient(135deg, ${theme.gradientStart} 0%, ${theme.gradientEnd} 100%);
              --text-gradient-light: linear-gradient(90deg, ${theme.gradientStart} 0%, ${theme.gradientEnd} 100%);
            }
            
            /* System Dark Mode (unless overridden by Light) */
            @media (prefers-color-scheme: dark) {
              :root:not([data-theme="light"]) {
                --foreground: #f8fafc;
                --secondary: #f8fafc;
                --primary-light: ${theme.gradientStartDark || theme.gradientStart};
                --primary: ${theme.gradientEndDark || theme.gradientEnd};
                --primary-gradient: linear-gradient(135deg, ${theme.gradientStartDark || theme.gradientStart} 0%, ${theme.gradientEndDark || theme.gradientEnd} 100%);
                --sidebar-bg: ${theme.sidebarBgDark};
                --sidebar-text: #f8fafc;
                --text-gradient: linear-gradient(90deg, #f8fafc 0%, ${theme.gradientEndDark || theme.gradientEnd} 100%);
              }
            }

            /* Generic Light Mode fallback (System Light or overridden) */
            :root, :root[data-theme="light"] {
                --foreground: #09131e;
                --secondary: #09131e;
                --sidebar-bg: ${theme.sidebarBgLight};
                --sidebar-text: #09131e;
                --text-gradient: linear-gradient(90deg, #09131e 0%, ${theme.gradientEnd} 100%);
            }

            /* Explicit Dark Mode Override */
            :root[data-theme="dark"] {
                --foreground: #f8fafc;
                --secondary: #f8fafc;
                --primary-light: ${theme.gradientStartDark || theme.gradientStart};
                --primary: ${theme.gradientEndDark || theme.gradientEnd};
                --primary-gradient: linear-gradient(135deg, ${theme.gradientStartDark || theme.gradientStart} 0%, ${theme.gradientEndDark || theme.gradientEnd} 100%);
                --sidebar-bg: ${theme.sidebarBgDark};
                --sidebar-text: #f8fafc;
                --text-gradient: linear-gradient(90deg, #f8fafc 0%, ${theme.gradientEndDark || theme.gradientEnd} 100%);
            }
          `}} />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
