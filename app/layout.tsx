import '../styles/globals.css'
import { ReactNode } from "react";
import Recoil from "@/lib/recoil/Recoil";
import ToastProvider from "@/components/TaostProvider";

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en">
    <Recoil>
      <body>
      <ToastProvider>{children}</ToastProvider>
      </body>
    </Recoil>
    </html>
  )
}
