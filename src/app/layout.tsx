import type { Metadata } from "next";
import type { NextFont } from "next/dist/compiled/@next/font";
import { Roboto } from "next/font/google";
import { ContextProvider } from "@/context/context";
import "./globals.css";

const roboto: NextFont = Roboto({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "Calculator by Asser Almadawy",
  description: "A Calculator Web App",
  authors: [{ name: "Asser Almadawy" }],
  viewport: "width=device-width, initial-scale=1"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContextProvider>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        </head>
        <body className={roboto.className}>
          {children}
        </body>
      </html>
    </ContextProvider>
  );
}