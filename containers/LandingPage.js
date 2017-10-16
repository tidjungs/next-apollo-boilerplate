import React from 'react';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

const LandingPage = ({ data: { loading, error, todos } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div>
      <div>
        {
          todos.map(todo => (
            <p>{todo.text}</p>
          ))
        }
      </div>
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
