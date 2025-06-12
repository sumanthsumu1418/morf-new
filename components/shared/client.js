import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getCookie, setCookie } from "cookies-next";

export const AUTH_TOKEN_KEY = "VENDURE_AUTH_TOKEN";

const httpLink = new HttpLink({
  //uri: "https://vendure.morf.co/shop-api",
  uri: "https://morf-vendure.kurage.store/shop-api",
  withCredentials: true,
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const authHeader = context.response.headers.get("vendure-auth-token");
    if (authHeader) setCookie(AUTH_TOKEN_KEY, authHeader);
    return response;
  });
});

const client = new ApolloClient({
  link: ApolloLink.from([
    setContext(() => {
      const getCookies = getCookie("VENDURE_AUTH_TOKEN");
      if (getCookies) {
        return {
          headers: {
            authorization: `Bearer ${getCookies}`,
          },
        };
      }
    }),
    afterwareLink,
    httpLink,
  ]),
  cache: new InMemoryCache(),
});

export default client;
