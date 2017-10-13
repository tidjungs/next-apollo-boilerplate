import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import initStore from '../redux/store';

export default function withAppLayout(title = 'komcal') {
  return (Component) => {
    class Layout extends React.Component {
      static async getInitialProps(ctx) {
        const headers = ctx.req ? ctx.req.headers : {};
        const props = {
          url: { query: ctx.query, pathname: ctx.pathname },
          ...(await (Component.getInitialProps
            ? Component.getInitialProps(ctx)
            : {})),
        };

        return {
          headers,
          ...props,
        };
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
                <Provider store={initStore}>
                  <Component {...this.props} />
                </Provider>
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
