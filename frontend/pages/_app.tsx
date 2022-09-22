import { ApolloProvider } from "@apollo/client";

import type { AppProps } from "next/app";
import { client } from "../services/graphql/client";
import "../styles/globalStyles.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
