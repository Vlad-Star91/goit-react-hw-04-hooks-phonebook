import { useState } from 'react';
import shortid from 'shortid';
import s from './Form.module.css';

export default function Form({ contactList, onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const InputValues = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const addContact = e => {
    e.preventDefault();
    const lengthInputName = name.length;
    const lengthInputNumber = number.length;
    e.preventDefault();
    if (lengthInputName < 2 || lengthInputName > 10) {
      alert('Enter a name greater than 1 character and no more than 10');
      return;
    }
    if (lengthInputNumber < 7 || lengthInputNumber > 10) {
      alert('Enter a number greater than 7 character and no more than 10');
      return;
    }
    const checkName = contactList({ name });
    if (checkName) {
      alert('This name is already in contacts');
      return;
    }

    onSubmit({
      id: shortid.generate(),
      name,
      number,
    });
    resetInputValues();
  };

  const resetInputValues = () => {
    setName('');
    setNumber('');
  };

  const idName = shortid.generate();
  const idNumber = shortid.generate();

  return (
    <form className={s.form} onSubmit={addContact}>
      <label htmlFor={idName} className={s.labelName}>
        Name
      </label>
      <input
        id={idName}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        value={name}
        onChange={InputValues}
        autoComplete="off"
      ></input>
      <label htmlFor={idNumber} className={s.labelNumber}>
        Number
      </label>
      <input
        id={idNumber}
        type="tel"
        pattern="^[ 0-9]+$"
        name="number"
        value={number}
        onChange={InputValues}
        autoComplete="off"
      ></input>
      <button className={s.btnForm} type="submite">
        Add contact
      </button>
    </form>
  );
}
