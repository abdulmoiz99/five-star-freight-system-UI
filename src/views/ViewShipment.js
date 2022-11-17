import React from 'react'
import Sidebar from '../componenets/Sidebar/Sidebar'
import NavBar from '../componenets/NavBar/AdminNavbar'
import FooterAdmin from '../componenets/Footers/FooterAdmin'
import { IsAdmin } from '../shared/LoacalStorage'
import HeaderBar from '../componenets/Headers/HeaderBar'
import { OpenShipmentTable } from '../componenets/Tables/OpenShipmentTable'

export class ViewShipment extends React.Component {
  render() {
    return (
      <>
        <Sidebar isAdmin={IsAdmin()} />
        <div className="relative md:ml-64 bg-blueGray-100">
          <NavBar PageName="Create New Order" />
          <HeaderBar />
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <OpenShipmentTable />
              </div>
            </div>
          </div>
        </div>
        <FooterAdmin />
      </>
    )
  }
}
