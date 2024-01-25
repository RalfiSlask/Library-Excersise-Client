import React from 'react';
import ReactDOM from 'react-dom/client';
import Library from './pages/library/Library.tsx';
import BookInfo from './pages/bookinfo/BookInfo.tsx';
import LoginScreen from './pages/loginscreen/LoginScreen.tsx';
import './styles/index.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import CreateAccount from './pages/createaccount/CreateAccount.tsx';
import { LibraryProvider } from './context/LibraryContext.tsx';
import { LoginContextProvider } from './context/LoginContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginContextProvider>
      <LibraryProvider>
        <HashRouter>
          <Routes>
            <Route path="/" Component={LoginScreen} />
            <Route path="/library" Component={Library} />
            <Route path="/info" Component={BookInfo} />
            <Route path="/account" Component={CreateAccount} />
          </Routes>
        </HashRouter>
      </LibraryProvider>
    </LoginContextProvider>
  </React.StrictMode>
);
