import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type State = Todo[];

const startTodos: State = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState: startTodos,
  reducers: {
    setTodo: (_state, action: PayloadAction<State>) => {
      return action.payload;
    },
  },
});

export default todosSlice.reducer;
export const { actions } = todosSlice;
