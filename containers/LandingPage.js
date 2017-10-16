import React from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const LandingPage = (props) => {
  return (
    <div>
      <Title>Hello world</Title>
    </div>
  );
};

export default compose(
)(LandingPage);
