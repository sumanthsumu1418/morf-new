import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { setCookie } from "cookies-next";

export const AUTH_TOKEN_KEY = "VENDURE_AUTH_TOKEN";

const httpLink = new HttpLink({
  //uri: `https://morf-vendure-production.appp.studio/shop-api`,
  //uri: "https://vendure.morf.co/shop-api",
  uri: "https://morf-vendure.kurage.store/shop-api",
  withCredentials: true,
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const authHeader = context.response.headers.get("vendure-auth-token");

    if (authHeader) {
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_TOKEN_KEY, authHeader);
        setCookie(AUTH_TOKEN_KEY, authHeader);
      }
    }

    return response;
  });
});

const Reclient = (token) => {
  const client = new ApolloClient({
    link: ApolloLink.from([
      setContext(() => {
        if (token) {
          return {
            headers: {
              authorization: `Bearer ${token}`,
            },
          };
        }
      }),
      afterwareLink,
      httpLink,
    ]),
    cache: new InMemoryCache(),
  });

  return client;
};

export default Reclient;
