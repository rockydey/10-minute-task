// app/layout.tsx
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
