/* eslint-disable max-len */
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[],
  onSetShowModalWindow: (value: boolean) => void,
  onSetSelectedTodo: (todo: Todo) => void,
  selectedTodo: Todo | null,
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSetShowModalWindow,
  onSetSelectedTodo,
  selectedTodo,
}) => {
  return (
    <>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {todos.map(todo => (
            <TodoItem
              todo={todo}
              key={todo.id}
              onSetShowModalWindow={onSetShowModalWindow}
              onSetSelectedTodo={onSetSelectedTodo}
              selectedTodo={selectedTodo}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
