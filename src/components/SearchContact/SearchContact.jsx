import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import s from './SearchContact.module.css';

export default function SearchContact({ SearchContact }) {
  const [filter, setFilter] = useState('');
  const id = shortid.generate();
  return (
    <div className={s.containerSearch}>
      <label className={s.labelSearch} htmlFor={id}>
        Find contacts by name
      </label>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={e => {
          const value = e.target.value;
          setFilter(value);
          SearchContact(value);
        }}
        id={id}
        className={s.inputSearch}
      ></input>
    </div>
  );
}
SearchContact.propTypes = {
  value: PropTypes.string,
  SearchContact: PropTypes.func.isRequired,
};
