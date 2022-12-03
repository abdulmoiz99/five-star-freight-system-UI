import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import { Login } from './componenets/Auth/Login'
import { ViewShipment } from './views/ViewShipment';
import { Shipment } from './views/Shipment';
import { ShipmentDetail } from './views/ShipmentDetail';
import { ShipperBids } from './views/Bids/ShipperBids';
import { ViewCarriers } from './views/Carriers/ViewCarriers';
import { AddCarrier } from './views/Carriers/AddCarrier';
import { ViewShipper } from './views/Shippers/ViewShipper';
import { AddShipper } from './views/Shippers/AddShipper';
import { AssignCarriers } from './views/Shippers/AssignCarriers';
import { ViewShipperCarrier } from './views/Carriers/ViewShipperCarrier';
import { BidInfo } from './views/Bids/BidInfo';
import { ViewBids } from './views/Bids/ViewBids';
import { RequestCarrier } from './views/Carriers/RequestCarrier';
import { EditShipper } from './views/Shippers/EditShipper';
import { EditCarrier } from './views/Carriers/EditCarrier';


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={< Login />}></Route>
      <Route path="/Shipment" element={< Shipment />}></Route>
      <Route path="/ShipmentDetails" element={< ShipmentDetail />}></Route>
      <Route path="/ViewShipments" element={< ViewShipment />}></Route>
      <Route path="/ShipperBids" element={< ShipperBids />}></Route>
      <Route path="/AddCarrier" element={< AddCarrier />}></Route>
      <Route path="/Carriers" element={< ViewCarriers />}></Route>
      <Route path="/Carriers/Edit" element={< EditCarrier />}></Route>
      <Route path="/ShipperCarriers" element={< ViewShipperCarrier />}></Route>
      <Route path="/AddShipper" element={< AddShipper />}></Route>
      <Route path="/Shippers" element={< ViewShipper />}></Route>
      <Route path="/Shippers/Edit" element={< EditShipper />}></Route>
      <Route path="/AssignCarriers" element={< AssignCarriers />}></Route>
      <Route path="/BidInfo" element={< BidInfo />}></Route>
      <Route path="/ViewBids" element={< ViewBids />}></Route>
      <Route path="/ShipperCarriers/RequestCarrier" element={< RequestCarrier />}></Route>

    </Routes>
  </BrowserRouter>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
