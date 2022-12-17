import React from 'react'
import Sidebar from '../../componenets/Sidebar/Sidebar'
import NavBar from '../../componenets/NavBar/AdminNavbar'
import FooterAdmin from '../../componenets/Footers/FooterAdmin'
import { IsAdmin } from '../../shared/LoacalStorage'
import HeaderBar from '../../componenets/Headers/HeaderBar'
import { UpdatePassword } from '../../componenets/Auth/UpdatePassword'

export function Settings() {
  return (
    <>
      <Sidebar isAdmin={IsAdmin()} />
      <div className="relative md:ml-64 bg-blueGray-100">
        <NavBar PageName="Bids" />
        <HeaderBar />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-6/12 mb-19 xl:mb-0 px-4">
              <UpdatePassword />
            </div>
          </div>
        </div>
      </div>
      <FooterAdmin />
    </>
  )
}
