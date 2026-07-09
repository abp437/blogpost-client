import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ACCESS_TOKEN_STORAGE_KEY } from "@/constants/authClient";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  credentials: "include",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)}`,
  },
});

export default client;
