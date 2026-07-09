import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ACCESS_TOKEN_STORAGE_KEY } from "@/constants/authClient";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
