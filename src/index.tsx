import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from './Context/AuthContext';
import { AxiosContextProvider } from './Context/AxiosContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <GoogleOAuthProvider clientId="557722935728-qouigb5c9lm57qs93a854ol6kkkevcgj.apps.googleusercontent.com">
    <AuthContextProvider>
      <AxiosContextProvider>
        <App />
      </AxiosContextProvider>
    </AuthContextProvider>
  </GoogleOAuthProvider>
);
serviceWorkerRegistration.register();

reportWebVitals();
