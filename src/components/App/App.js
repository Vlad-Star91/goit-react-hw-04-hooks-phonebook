import React from "react";
import s from "../PhoneBook/PhoneBook.module.css";
import shortid from "shortid";

import Form from "../ContactForm/Form";
import ContactList from "../ContactList/ContactList";
import SearchContact from "../SearchContact/SearchContact";

export default class Mobile extends React.Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    )
      ? alert("This name is already in contacts.")
      : this.setState((prevState) => ({
          contacts: [contact, ...prevState.contacts],
        }));
  };

  valuesFilter = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  getFilter = () => {
    const { filter, contacts } = this.state;
    const filterValues = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterValues)
    );
  };

  checkName = (newName) => {
    return this.state.contacts.some(
      ({ name }) => name === Object.values(newName).join("")
    );
  };

  deletedContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const filterContact = this.getFilter();
    return (
      <div className={s.container}>
        <h1 className={s.headingForm}>Phonebook</h1>
        <Form onSubmit={this.addContact} contactList={this.checkName} />
        <h2 className={s.contactList}>Contacts</h2>
        <SearchContact
          value={this.state.filter}
          SearchContact={this.valuesFilter}
        />
        <ContactList
          contactList={filterContact}
          onDeleted={this.deletedContact}
        />
      </div>
    );
  }
}
