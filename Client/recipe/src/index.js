import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { UserProvider } from './features/context';
import { ProgressProvider } from './features/ProgressContext';
import {FilterProvider} from './features/FilterContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ProgressProvider>

        <FilterProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </FilterProvider>

      </ProgressProvider>
    </UserProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();