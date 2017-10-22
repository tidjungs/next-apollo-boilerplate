import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { compose } from 'recompose';
import withApp from '../lib/withApp';

const DetailPage = ({ data: { todo } }) => {
  if (!todo) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <p>detail</p>
      <p>{ todo.id }</p>
      <p>{ todo.text }</p>
    </div>
  );
};

DetailPage.propTypes = {
  data: PropTypes.object,
};

const todoQuery = gql`
  query TodoQuery($id: ID!) {
    todo(id: $id) {
      id
      text
    }
  }
`;

export default compose(
  withApp(),
  graphql(todoQuery, {
    options: props => (
      { variables: { id: props.url.query.postId } }
    ),
  }),
)(DetailPage);
