import React from 'react'
import { SideBarButton } from '../_Global/_Button'

export default function CarrierSideBar() {
  return (
    <>
      <li className="items-center">
        <SideBarButton To="/ShipperBids" Text="Open Loads" />
      </li>
      <li className="items-center">
        <SideBarButton To="/viewShipments" Text="Awarded" />
      </li>
      <li className="items-center">
        <SideBarButton To="/AssignShippers" Text="Shippers" />
      </li>
    </>
  )
}
