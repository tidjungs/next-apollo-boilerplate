import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { ApolloProvider, getDataFromTree } from 'react-apollo';

import initApollo from './initApollo';
import reduxStore from './reduxStore';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function withAppLayout(title = 'komcal') {
  return (Component) => {
    class Layout extends React.Component {
      static propTypes = {
        serverState: PropTypes.object,
      }
      static async getInitialProps(ctx) {
        let serverState = {};
        const headers = ctx.req ? ctx.req.headers : {};
        const props = {
          url: { query: ctx.query, pathname: ctx.pathname },
          ...(await (Component.getInitialProps
            ? Component.getInitialProps(ctx)
            : {})),
        };
        if (!process.browser) {
          const apollo = initApollo();
          const store = reduxStore(apollo, apollo.initialState);
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <Component {...props} />
            </ApolloProvider>,
          );
          const state = store.getState();
          serverState = {
            ...state,
            apollo: {
              data: state.apollo.data,
            },
          };
        }
        return {
          headers,
          serverState,
          ...props,
        };
      }
      constructor(props) {
        super(props);
        this.apollo = initApollo(this.props.serverState);
        this.reduxStore = reduxStore(this.apollo, this.props.serverState);
      }
      render() {
        return (
          <div id="my-app">
            <Head>
              <title>{title}</title>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>
            <div className="body-container">
              <Header />
              <div className="content">
                <ApolloProvider client={this.apollo} store={this.reduxStore}>
                  <Component {...this.props} />
                </ApolloProvider>
              </div>
              <Footer />
            </div>
          </div>
        );
      }
    }
    return Layout;
  };
}
