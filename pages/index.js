import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import initStore from '../redux/store';

class Index extends Component {
  render() {
    return (
      <div>{ this.props.test }</div>
    );
  }
}

Index.propTypes = {
  test: PropTypes.string,
};

const mapStateToProps = ({ index }) => ({
  test: index.test,
});

const IndexWithRedux = withRedux(initStore, mapStateToProps, null)(Index);

export default IndexWithRedux;
