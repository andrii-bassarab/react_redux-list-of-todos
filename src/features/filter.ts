import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type State = {
  status: Status;
  query: string;
};

const startState: State = {
  status: 'all',
  query: '',
};

const statusSlice = createSlice({
  name: 'filter',
  initialState: startState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
    setQuery: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
  },
});

export const { actions } = statusSlice;
export default statusSlice.reducer;
