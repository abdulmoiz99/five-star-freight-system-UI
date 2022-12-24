import React from 'react'
import Sidebar from '../../componenets/Sidebar/Sidebar'
import FooterAdmin from '../../componenets/Footers/FooterAdmin'
import HeaderBar from '../../componenets/Headers/HeaderBar'
import AwaitingBidsTable from '../../componenets/Tables/AwaitingBidsTable'

export function AwaitingBids() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <HeaderBar />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <AwaitingBidsTable />
            </div>
          </div>
        </div>
      </div>
      <FooterAdmin />
    </>
  )
}
