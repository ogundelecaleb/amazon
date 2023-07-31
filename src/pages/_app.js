import { Provider } from "react-redux";
import { store } from "../app/store";
import Script from 'next/script'
import "../styles/globals.css";
import { SessionProvider  } from "next-auth/react";

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
        <script src="https://checkout.paylodeservices.com/checkout.js"></script>

      </Provider>
      </SessionProvider>
  );
};

export default MyApp;
