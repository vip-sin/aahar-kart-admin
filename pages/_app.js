import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
// Register the line controller
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
