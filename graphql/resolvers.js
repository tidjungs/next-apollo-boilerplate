const todos = [
  {
    id: '1',
    text: 'Hello world',
    complete: false,
  },
  {
    id: '2',
    text: 'test test',
    complete: true,
  },
];

const resolvers = {
  Query: {
    todos: () => todos,
    todo: (root, { id }) => todos.find(todo => todo.id === id),
    filterTodos: (root, { status }) => todos.filter(todo => todo.complete === status),
  },
  Mutation: {
    addTodo: (root, { text }) => {
      const nextId = todos.length + 1;
      const todo = {
        id: nextId,
        text,
        complete: false,
      };
      todos.push(todo);
      return todo;
    },
    removeTodo: (root, { index }) => {
      todos.splice(index, 1);
      return todos;
    },
    checkTodo: (root, { status, index }) => {
      todos[index].complete = status;
      return todos;
    },
  },
};

export default resolvers;
