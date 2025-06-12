import { wrapper } from "store/store";
import "locomotive-scroll/src/locomotive-scroll.scss";
import "styles/main.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { hotjar } from "react-hotjar";
// import { QueryClientProvider, QueryClient } from "react-query";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userInitialState } from "store/user/reducer";
import { setState } from "store/user/action";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

// const queryclient = new QueryClient();
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    //uri: "http://morf-vendure-production.appp.studio/shop-api",
    uri: process.env.GRAPHQL,
  }),
});

function MyApp({ Component, pageProps, session }) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

 
  return (
    <>
      {/* <QueryClientProvider client={queryclient}> */}

      <SessionProvider
        session={session}
        options={{ clientMaxAge: new Date(Date.now() + 200) }}
      >
        <ApolloProvider client={client}>
          <ToastContainer />
          <Component {...pageProps} />
        </ApolloProvider>
        {/* </QueryClientProvider> */}
      </SessionProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
