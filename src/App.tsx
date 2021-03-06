import React, { useState, useEffect } from 'react';
import { Col, Row } from "reactstrap";

import PhoneKeyboard from "./components/PhoneKeyboard";
import ContactList from "./components/ContactList";

import { ContactType, KeyboardButtonType } from "./types/data";
import * as helpers from './utils/helpers';

import './App.css';

const App: React.FC = () => {
  const [keyboardValue, setKeyboardValue] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('/contact.json')
      .then((response: Response) => response.json())
      .then((data: any) => {
        // console.log(data);
        setContacts(data);
      })
      .catch((error: any) => {
      console.error(error);
    });

  }, []);

  const handleKeyboardClick = (keyboardButton: KeyboardButtonType) => {
    const { number } = keyboardButton;

    if (number === 'x') {
      setKeyboardValue('');
    } else if(number === '<') {
      setKeyboardValue(keyboardValue.substring(0, keyboardValue.length - 1));
    } else {
      setKeyboardValue(`${keyboardValue}${keyboardButton.number}`);
    }
  };

  const filterContacts = (contacts: ContactType[], keyword: string): ContactType[] => {
    if (keyword.length > 0) {
      return helpers.filterContacts(contacts, keyword);
    }

    return contacts;
  };

  return (
    <div className="App">
      <Row>
        <Col lg={{ size: 4, offset: 2 }}>
          <PhoneKeyboard
            value={keyboardValue}
            onClick={ (value: KeyboardButtonType) => handleKeyboardClick(value) }
          />
        </Col>
        <Col lg="4">
          <ContactList
            data={filterContacts(contacts, keyboardValue)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default App;
