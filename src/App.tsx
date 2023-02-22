/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { actions as actionsTodo } from './features/currentTodo';
import { actions as actionFilter } from './features/filter';
import { actions as actionTodos } from './features/todos';
import { Status } from './types/Status';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const [showModalWindow, setShowModalWindow] = useState(false);
  // const [query, setQuery] = useState('');
  // const [selectedOption, setSelectedOption] = useState('all');
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [isInitializated, setIsInitializated] = useState(false);
  // const [selectedTodo, setSelectedTodo] = useState<Todo | n

  const selectedFilter = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const setTodos = (newTodos: Todo[]) => dispatch(actionTodos.setTodo(newTodos));
  const setTodo = (todo: Todo) => dispatch(actionsTodo.setTodo(todo));
  const removeTodo = () => dispatch(actionsTodo.removeTodo());
  const setSelectedFilter = (value: Status) => dispatch(actionFilter.setStatus(value));
  const setSelectedQuery = (value: string) => dispatch(actionFilter.setQuery(value));

  const getVisibleTodos = () => {
    let filteredTodos = todos.filter(todo => {
      switch (selectedFilter.status) {
        case 'completed':
          return todo.completed;

        case 'active':
          return !todo.completed;

        case 'all':
          return todo;

        default:
          return todo;
      }
    });

    filteredTodos = filteredTodos.filter(todo => todo.title.toLocaleLowerCase().includes(selectedFilter.query.toLocaleLowerCase()));

    return filteredTodos;
  };

  const visibleTodos = useMemo(() => getVisibleTodos(), [selectedFilter, todos]);

  const getTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } finally {
      setIsInitializated(true);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              {!isInitializated && <Loader />}
              {isInitializated && !todos.length && (
                <p className="notification is-warning">
                  There are no todos matching current filter criteria
                </p>
              )}
              {isInitializated && todos.length && (
                <>
                  <TodoFilter
                    query={selectedFilter.query}
                    onSetQuery={(value: string) => setSelectedQuery(value)}
                    onSetSelectedOption={(value: Status) => setSelectedFilter(value)}
                    selectedOption={selectedFilter}
                  />
                  <TodoList
                    todos={visibleTodos}
                    onSetShowModalWindow={(value: boolean) => setShowModalWindow(value)}
                    onSetSelectedTodo={setTodo}
                    selectedTodo={selectedTodo}
                  />
                </>
              )}
            </div>
          </div>
          {showModalWindow && selectedTodo && (
            <TodoModal
              selectedTodo={selectedTodo}
              closeModalWindow={() => {
                setShowModalWindow(false);
                removeTodo();
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
