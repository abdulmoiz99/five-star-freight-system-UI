import React from 'react'
import HeaderBar from '../../componenets/Headers/HeaderBar'
import Sidebar from '../../componenets/Sidebar/Sidebar'
import { SupportTable } from '../../componenets/Tables/SupportTable'

export function Support() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <HeaderBar />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <SupportTable />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
