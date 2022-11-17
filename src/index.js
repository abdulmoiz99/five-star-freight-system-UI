import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import { Login } from './componenets/Auth/Login'
import { CreateShipment } from './views/CreateShipment';
import { ViewShipment } from './views/ViewShipment';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={< Login />}></Route>
      <Route path="/CreateShipment" element={< CreateShipment />}></Route>
      <Route path="/ViewShipments" element={< ViewShipment />}></Route>

    </Routes>
  </BrowserRouter>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
