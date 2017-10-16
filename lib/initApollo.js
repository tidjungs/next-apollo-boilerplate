import { ApolloClient, createNetworkInterface } from 'react-apollo';
import fetch from 'isomorphic-fetch';

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}
const initNetworkInterface = () => {
  const networkInterface = createNetworkInterface({
    uri: 'http://localhost:8080',
    opts: {
      credentials: 'same-origin',
    },
  });

  return networkInterface;
};

const createClient = headers =>
  new ApolloClient({
    ssrMode: !process.browser,
    ssrForceFetchDelay: 100,
    headers,
    networkInterface: initNetworkInterface(),
  });

export default (headers) => {
  if (!process.browser) {
    return createClient(headers);
  }
  if (!apolloClient) {
    apolloClient = createClient(headers);
  }
  return apolloClient;
};
