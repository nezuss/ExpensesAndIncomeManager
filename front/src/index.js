import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
//? Pages
import App from './Pages/App';
import Auth from './Pages/Auth/Page';
import Categories from './Pages/Categories/Page';
import Expenses from './Pages/Expenses/Page';
import Income from './Pages/Income/Page';
//? Components
import Navbar from './Components/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Navbar />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/income" element={<Income />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);