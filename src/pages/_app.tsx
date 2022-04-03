import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import type { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import { Layout } from "@/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MDXProvider>
  );
}

export default MyApp;
