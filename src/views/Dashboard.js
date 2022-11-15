import React from 'react'
import Sidebar from '../componenets/Sidebar/Sidebar'
import NavBar from '../componenets/NavBar/AdminNavbar'
// import { AddReport } from '../componenets/Cards/AddReport'
import FooterAdmin from '../componenets/Footers/FooterAdmin'
import { getStorage, IsAdmin } from '../shared/LoacalStorage'
import HeaderBar from '../componenets/Headers/HeaderBar'

export class Dashboard extends React.Component {
  render() {
    return (
      <>
        <Sidebar isAdmin={IsAdmin()} />
        <div className="relative md:ml-64 bg-blueGray-100">
          <NavBar PageName="Dashboard" />
          <HeaderBar />
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                {/* <AddReport /> */}
              </div>
            </div>
          </div>
        </div>
        <FooterAdmin />
      </>
    )
  }
}
