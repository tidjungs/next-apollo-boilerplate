import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type Todo {
    id: ID!
    text: String
    complete: Boolean
  }
  type Query {
    todos: [Todo]
    todo(id: ID!): Todo
    filterTodos(status: Boolean): [Todo]
  }
  type Mutation {
    addTodo(text: String!): Todo
    removeTodo(index: Int!): [Todo]
    checkTodo(status: Boolean, index: Int!): [Todo]
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
