import React from 'react'
import { SideBarButton } from '../_Global/_Button'

export default function AdminSideBar() {
  return (
    <>
      <li className="items-center">
        <SideBarButton To="/Shippers" Text="Shippers" />
      </li>
      <li className="items-center">
        <SideBarButton To="/Carriers" Text="Carriers" />
      </li>
      <li className="items-center">
        <SideBarButton To="/ViewShipments" Text="Load Status" />
      </li>
      <li className="items-center">
        <SideBarButton To="/ShipperBids" Text="Bids" />
      </li>
    </>
  )
}
