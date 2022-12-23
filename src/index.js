import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import './tailwindLatest.css';
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
import { BidInfo } from './views/Bids/BidInfo';
import { ViewBids } from './views/Bids/ViewBids';
import { RequestCarrier } from './views/Carriers/RequestCarrier';
import { EditShipper } from './views/Shippers/EditShipper';
import { EditCarrier } from './views/Carriers/EditCarrier';
import { AssignShippers } from './views/Carriers/AssignShippers';
import { DriverStatus } from './views/Shipment/DriverStatus';
import { FreightSpend } from './views/FreightSpend/FreightSpend';
import { Settings } from './views/Settings/Settings';
import { Claims } from './views/Claims/Claims';
import { FileClaim } from './views/Claims/FileClaim';
import { RFP } from './views/Shipment/RFP';
import { Support } from './views/Support/Support';
import { CreateTicket } from './views/Support/CreateTicket';


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={< Login />}></Route>
      <Route path="*" element={< Login />}></Route>

      <Route path="/Shipment" element={< Shipment />}></Route>
      <Route path="/Shipment/RFP" element={< RFP />}></Route>
      <Route path="/ViewShipments" element={< ViewShipment />}></Route>
      <Route path="/ViewShipments/DriverStatus" element={< DriverStatus />}></Route>
      <Route path="/ViewShipments/Details" element={< ShipmentDetail />}></Route>


      <Route path="/AddCarrier" element={< AddCarrier />}></Route>
      <Route path="/Carriers" element={< ViewCarriers />}></Route>
      <Route path="/Carriers/Edit" element={< EditCarrier />}></Route>
      <Route path="/AddShipper" element={< AddShipper />}></Route>
      <Route path="/Shippers" element={< ViewShipper />}></Route>
      <Route path="/Shippers/Edit" element={< EditShipper />}></Route>
      <Route path="/AssignCarriers" element={< AssignCarriers />}></Route>

      <Route path="/BidInfo" element={< BidInfo />}></Route>
      <Route path="/ShipperBids" element={< ShipperBids />}></Route>
      <Route path="/ShipperBids/ViewBids" element={< ViewBids />}></Route>

      <Route path="/Carriers/RequestCarrier" element={< RequestCarrier />}></Route>
      <Route path="/AssignShippers" element={< AssignShippers />}></Route>

      <Route path="/FreightSpend" element={< FreightSpend />}></Route>

      <Route path="/Settings" element={< Settings />}></Route>

      <Route path="/Claims" element={< Claims />}></Route>
      <Route path="/Claims/FileClaim" element={< FileClaim />}></Route>

      <Route path="/Support" element={< Support />}></Route>
      <Route path="/Support/CreateTicket" element={< CreateTicket />}></Route>

    </Routes>
  </BrowserRouter>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
