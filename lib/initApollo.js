import { ApolloClient, createNetworkInterface } from 'react-apollo';
import fetch from 'isomorphic-fetch';

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}
const initNetworkInterface = () => {
  const networkInterface = createNetworkInterface({
    uri: 'http://localhost:8080/graphql',
    opts: {
      credentials: 'same-origin',
    },
  });

  return networkInterface;
};

const createClient = initialState =>
  new ApolloClient({
    initialState,
    ssrMode: !process.browser,
    ssrForceFetchDelay: 100,
    networkInterface: initNetworkInterface(),
  });

export default (initialState) => {
  if (!process.browser) {
    return createClient(initialState);
  }
  if (!apolloClient) {
    apolloClient = createClient(initialState);
  }
  return apolloClient;
};
