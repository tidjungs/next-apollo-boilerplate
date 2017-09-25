import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import initStore from '../redux/store';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

class Index extends Component {
  render() {
    return (
      <div>
        <Title>{this.props.test}</Title>
      </div>
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
