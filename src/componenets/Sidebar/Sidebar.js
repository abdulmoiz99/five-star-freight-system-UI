/*eslint-disable*/
import React from 'react'
import { Link } from 'react-router-dom'
import { getUserRole } from '../../shared/LoacalStorage'
import { SideBarButton } from '../_Global/_Button'
import AdminSideBar from './AdminSideBar'
import CarrierSideBar from './CarrierSideBar'
import ShipperSideBar from './ShipperSideBar'

export default function Sidebar({ isAdmin }) {
  const [collapseShow, setCollapseShow] = React.useState('hidden')
  const [role] = React.useState(getUserRole())

  return (
    <>
      <div className="flex flex-wrap ">
        <div className="w-full">
          <nav className="flex flex-wrap items-center justify-between px-2 py-3 bg-blueGray-700 ">
            <div className="container px-4  flex flex-wrap items-center justify-between">
              <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white" href="#pablo">
                  FIVE STAR FREIGHT SYSTEMS |  {getUserRole()} Portal
                </a>
              </div>
            </div>
            <div className="ml-auto mr-0" style={{ float: "right" }}>
              <ul className="list-none ">
                <li className="pl-10 pr-20">
                  <a className=" bg-blueGray-800 px-3 py-2 flex text-xs uppercase font-bold text-white hover:opacity-100 hover:bg-blueGray-600 rounded"
                    href="/Login">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <nav className="md:left-0 md:block md:fixed  md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden  bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {role == "ADMIN" ? (
                <>
                  <AdminSideBar />
                </>
              ) : null
              }
              {role == "SHIPPER" ? (
                <>
                  <ShipperSideBar />
                </>
              ) : null
              }
              {role == "CARRIER" ? (
                <>
                  <CarrierSideBar />
                </>
              ) : null
              }
              <li className="items-center">
                <SideBarButton To="/Settings" Text="Settings" />
              </li>
            </ul>
            <hr className="my-4 md:min-w-full" />
          </div>
        </div>
      </nav>
    </>
  )
}
