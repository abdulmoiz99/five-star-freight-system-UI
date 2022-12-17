import React from 'react'
import Sidebar from '../../componenets/Sidebar/Sidebar'
import NavBar from '../../componenets/NavBar/AdminNavbar'
import { IsAdmin } from '../../shared/LoacalStorage'
import FreightSpendCard from '../../componenets/Cards/FreightSpendCard'

export function FreightSpend() {
  return (
    <>
      <Sidebar isAdmin={IsAdmin()} />
      <div className="relative md:ml-64 bg-blueGray-100">
        <NavBar PageName="Freight Spend" />
        <FreightSpendCard />
      </div>
    </>
  )
}
