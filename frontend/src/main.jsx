import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';
import { GlobalContextProvider } from './context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FpjsProvider
      loadOptions = {{
        apiKey: 'RHAg1zlsSUVdZZ0zkCKo',
        endpoint: 'https://fp.tarockapp.com'
      }}
    >
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </FpjsProvider>
  </React.StrictMode>
);
