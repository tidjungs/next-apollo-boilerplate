import React from 'react';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import styled from 'styled-components';

const Title = styled.h1`
  color: red;
  font-size: 20px;
`;

const LandingPage = ({ data: { loading, error, todos } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div>
      <Title>
        {
          todos.map((todo, index) => (
            <p key={index}>{todo.text}</p>
          ))
        }
      </Title>
    </div>
  );
};

LandingPage.propTypes = {
  data: PropTypes.object,
};

export const todosListQuery = gql`
  query TodosListQuery {
    todos {
      id
      text
    }
  }
`;

export default compose(
  graphql(todosListQuery, {
    options: {},
  }),
)(LandingPage);
