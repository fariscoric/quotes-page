import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TokenContextProvider } from './context/context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FrontPage from "./pages/frontPage";
import HomePage from "./pages/homePage"
import CreateQuote from "./components/createQuote/createQuote"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TokenContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage/>}></Route>
          <Route path="quotes" element={<HomePage/>}></Route>
          <Route path="createQuote" element={<CreateQuote/>}></Route>
        </Routes>
      </Router>
    </TokenContextProvider>
);

