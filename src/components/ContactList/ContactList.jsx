import React from 'react';
import PropTypes from 'prop-types';

import s from './ContactList.module.css';

export default function ContactList({ contactList, onDeleted }) {
    return (
        <ul className={'js-list'}>
            {contactList.map(({ id, name, number }) => {
                return (
                    <li key={id}>
                        {name}: {number}
                        <button className={s.btnList} type="button" onClick={() => onDeleted(id)}>Deleted</button>
                    </li>
                );
            })}
        </ul>
    );
}

ContactList.propTypes = {
    contactList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }),
    ),
    onDelete: PropTypes.func,
};