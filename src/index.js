import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {configureStore} from 'redux'
import { googleSignIn } from './components/firebaseConfig';

// ACTION INCREMENT - function that returns an object
const logIn = () => {
  return {
    type: 'log-in',
    value: googleSignIn()
  }
}

const account = {};

// REDUCER
const accounts = (state=account, action) => {
  switch(action.type) {
    case 'log-in': 
      return state.concat(logIn().value);
    case 'log-out':
      return {};
    default: return;
  }
}

// STORE -> GLOBALIZED STATE
let store = configureStore(accounts);


// DISPATCH TO UI

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
