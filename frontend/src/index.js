import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './Context/AuthProvider'
import { Provider } from "react-redux"
import Store from './Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={Store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
  // </React.StrictMode>
);


