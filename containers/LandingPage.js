import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const LandingPage = (props) => {
  return (
    <div>
      <Title>{props.test}</Title>
    </div>
  );
};

LandingPage.propTypes = {
  test: PropTypes.string,
};

const mapStateToProps = ({ index }) => ({
  test: index.test,
});

export default compose(
  connect(mapStateToProps),
)(LandingPage);
