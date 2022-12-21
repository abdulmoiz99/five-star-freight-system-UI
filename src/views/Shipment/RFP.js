import React from 'react'
import RFPCard from '../../componenets/Cards/RFPCard'
import HeaderBar from '../../componenets/Headers/HeaderBar'
import Sidebar from '../../componenets/Sidebar/Sidebar'

export function RFP() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <HeaderBar />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap w-6/12">
            <div className="w-full  px-4">
              <RFPCard />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
