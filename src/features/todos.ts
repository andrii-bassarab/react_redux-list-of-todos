import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/SET';
  todos: Todo[];
};

const setTodo = (todos: Todo[]): SetTodos => ({
  type: 'todos/SET',
  todos,
});

export const actions = { setTodo };

type State = Todo[];
type Action = SetTodos;

const todosReducer = (
  todos: State = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.todos;

    default:
      return todos;
  }
};

export default todosReducer;
