"use client";

import Footer from "@/components/Footer";
import "./globals.css";
import { StateProvider } from "@/context/StateContext";
import { initialState, reducer } from "@/context/StateReducers";
import { CookiesProvider } from "react-cookie";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const router = useRouter();
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logo.ico" />
        <title>Zetalent</title>
      </head>
      <body>
        <CookiesProvider>
          <StateProvider>
            <div className="relative flex flex-col h-screen justify-between">
              <Navbar />
              <div className={`mb-auto w-full mx-auto ${router.pathname !== "/" ? "mt-36" : ""}`}>
                {children}</div>
              <Footer />
            </div>
          </StateProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
