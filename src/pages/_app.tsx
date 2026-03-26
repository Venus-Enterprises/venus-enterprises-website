import type { AppProps } from "next/app";
import "@/styles/globals.css";
import FloatingWhatsApp from "@/modules/FloatingWhatsApp/FloatingWhatsApp";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <FloatingWhatsApp />
    </>
  );
}