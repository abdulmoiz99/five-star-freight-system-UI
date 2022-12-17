import React from 'react'
import Sidebar from '../../componenets/Sidebar/Sidebar'
import HeaderBar from '../../componenets/Headers/HeaderBar'
import SettingsTabs from '../../componenets/Tabs/SettingsTabs'

export function Settings() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <HeaderBar />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap pt-15">
            <SettingsTabs />
          </div>
        </div>
      </div>
    </>
  )
}
