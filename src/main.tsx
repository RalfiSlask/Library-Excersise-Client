import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home.tsx';
import BookInfo from './BookInfo.tsx';
import './index.css';
import { HashRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/info" Component={BookInfo} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
