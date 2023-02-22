import React from 'react';
import { Status } from '../../types/Status';

interface Props {
  query: string,
  onSetQuery: (value: string) => void,
  onSetSelectedOption: (value: Status) => void,
  selectedOption: { status: Status; query: string; },
}

export const TodoFilter: React.FC<Props> = ({
  query,
  onSetQuery,
  onSetSelectedOption,
  selectedOption,
}) => {
  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption.status}
            onChange={(event) => {
              if (event.target.value === 'all'
                || event.target.value === 'active'
                || event.target.value === 'completed') {
                onSetSelectedOption(event.target.value);
              }
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={event => onSetQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onSetQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
