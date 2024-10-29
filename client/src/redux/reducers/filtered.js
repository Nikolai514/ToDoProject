export default function (todos, filter) {
  switch (filter) {
    case 'all':
      return todos; // Return all todos
    case 'aday':
      return todos.filter(todo => todo.completed);
    case 'over':
      return todos.filter(todo => todo.completed);
    case 'complete':
      return todos.filter(todo => todo.completed); // Adjust based on your todo structure
    default:
      return todos;
  }
};
