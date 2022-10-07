import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FpjsProvider
      loadOptions = {{
        apiKey: 'RHAg1zlsSUVdZZ0zkCKo'
      }}
    >
      <App />
    </FpjsProvider>
  </React.StrictMode>
);
