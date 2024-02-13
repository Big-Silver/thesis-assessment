import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AdminContextProvider } from "../../context/AdminContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AdminContextProvider>
      <Component {...pageProps} />
    </AdminContextProvider>
  );
}
