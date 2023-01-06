import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RecipesAppProvider from './context/RecipesAppProvider';

const root = ReactDOM
  .createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <RecipesAppProvider>
      <App />
    </RecipesAppProvider>
  </BrowserRouter>,
);
serviceWorker.unregister();
