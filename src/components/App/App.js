import { useState, useEffect } from 'react';
import s from '../PhoneBook/PhoneBook.module.css';
import shortid from 'shortid';

import Form from '../ContactForm/Form';
import ContactList from '../ContactList/ContactList';
import SearchContact from '../SearchContact/SearchContact';

export default function Mobile() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert('This name is already in contacts.')
      : setContacts([contact, ...contacts]);
  };
  const valuesFilter = value => {
    setFilter(value);
  };
  const getFilter = () => {
    const filterValues = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValues),
    );
  };
  const checkName = newName => {
    return contacts.some(
      ({ name }) => name === Object.values(newName).join(''),
    );
  };
  const deletedContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };
  const filterContact = getFilter();
  return (
    <div className={s.container}>
      <h1 className={s.headingForm}>Phonebook</h1>
      <Form onSubmit={addContact} contactList={checkName} />
      <h2 className={s.contactList}>Contacts</h2>
      <SearchContact value={filter} SearchContact={valuesFilter} />
      <ContactList contactList={filterContact} onDeleted={deletedContact} />
    </div>
  );
}
