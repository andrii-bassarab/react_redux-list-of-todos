import { Status } from '../types/Status';

type SetStatus = {
  type: 'status/SET';
  value: Status;
};

type SetQuery = {
  type: 'query/SET';
  value: string;
};

const setStatus = (value: Status): SetStatus => ({
  type: 'status/SET',
  value,
});

const setQuery = (value: string): SetQuery => ({
  type: 'query/SET',
  value,
});

export const actions = { setStatus, setQuery };

type State = {
  status: Status;
  query: string;
};
type Action = SetStatus | SetQuery;

const statusReducer = (
  state: State = {
    status: 'all',
    query: '',
  },
  action: Action,
): State => {
  switch (action.type) {
    case 'status/SET':
      return {
        ...state,
        status: action.value,
      };

    case 'query/SET':
      return {
        ...state,
        query: action.value,
      };

    default:
      return state;
  }
};

export default statusReducer;
