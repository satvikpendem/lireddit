import type { AppProps } from "next/app";
import { Provider } from "urql";

import { client } from "../services/graphql/client";

import "../styles/globalStyles.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
