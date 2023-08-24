import React from 'react';
import ReactDOM from 'react-dom/client';

import firebase from './_zlib/server/firebase';
import App from './App';

console.log(firebase);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
