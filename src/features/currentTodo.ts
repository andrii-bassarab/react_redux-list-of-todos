import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: null,
  reducers: {
    setTodo: (
      _state, action: PayloadAction<any>,
    ) => {
      return action.payload;
    },
    removeTodo: () => null,
  },
});

export default currentTodoSlice.reducer;
export const { actions } = currentTodoSlice;
