import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@context/Authentication";
import { MotionConfig } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/odi.svg"/>
        <title>One Day Intern</title>
      </Head>
      <MotionConfig reducedMotion="user">
        <ToastContainer
          containerId="root-toast"
          autoClose={2000}
          theme="colored"
        />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </MotionConfig>
    </>
  );
}

export default MyApp;
