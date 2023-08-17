import React from 'react';
import ReactDOM from 'react-dom/client';
import UserProvider from './context/UserContext';
import RecipeProvider from './context/RecipeContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </UserProvider>
  </React.StrictMode>
);
