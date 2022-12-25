import React from 'react'
import { SideBarButton } from '../_Global/_Button'

export default function ShipperSideBar() {
  return (
    <>
      <li className="items-center">
        <SideBarButton To="/Shipment" Text="Create Load" />
      </li>
      <li className="items-center">
        <SideBarButton To="/ViewShipments" Text="Load Status" />
      </li>
      <li className="items-center">
        <SideBarButton To="/AutoTender" Text="Auto Tender" />
      </li>
      <li className="items-center">
        <SideBarButton To="/FreightSpend" Text="Freight Spend" />
      </li>
      <li className="items-center">
        <SideBarButton To="/Carriers" Text="Carriers" />
      </li>
      <li className="items-center">
        <SideBarButton To="/ShipperBids" Text="Bids" />
      </li>
    </>
  )
}
