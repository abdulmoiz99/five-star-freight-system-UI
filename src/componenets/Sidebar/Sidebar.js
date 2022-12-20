/*eslint-disable*/
import React from 'react'
import { getUserRole } from '../../shared/LoacalStorage'
import { NavigationButton, SideBarButton } from '../_Global/_Button'
import AdminSideBar from './AdminSideBar'
import CarrierSideBar from './CarrierSideBar'
import ShipperSideBar from './ShipperSideBar'

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState('hidden')
  const [role] = React.useState(getUserRole())

  return (
    <>
      <nav className=" sm:px-4 py-2.5 bg-lightBlue-600 fixed w-full z-20 top-0 left-0  border-b border-gray-200 shadow-xl ">
        <div class="hidden sm:ml-6 sm:block p-3  items-center justify-left">
          <div class="flex space-x-4 ">
            <p className="leading-relaxed inline-block mr-4 whitespace-no-wrap text-white uppercase">
              <span className="text-sm font-bold" > FIVE STAR FREIGHT SYSTEMS | </span>
              <span className="text-sm font-semibold" > {getUserRole()} Portal </span>
            </p>
          </div>
        </div>
      </nav>
      <nav className="fixed top-0 bottom-0 md:left-0 md:block md:fixed
       md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden bg-gray-100 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 shadow-xl">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            <ul className="md:flex-col md:min-w-full flex flex-col list-none mt-20">
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
                <SideBarButton To="/Claims" Text="Claims" />
              </li>
              <li className="items-center">
                <SideBarButton To="/Settings" Text="Settings" />
              </li>
              <li className="items-center">
                <SideBarButton To="/login" Text="Logout" />
              </li>
            </ul>
            <div id="dropdown-cta" class="p-4 mt-6 bg-blue-50 rounded-lg dark:bg-blue-900" role="alert">
              <div class="flex items-center mb-3">
                <span class="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Beta</span>
                <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 inline-flex h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800" data-collapse-toggle="dropdown-cta" aria-label="Close">
                  <span class="sr-only">Close</span>
                  <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
              <p class="mb-3 text-sm text-blue-900 dark:text-blue-400">
                Preview the new FIVE STAR FREIGHT SYSTEMS user interface! Since the interface is in beta you might find some bugs.
              </p>
            </div>
            <hr className="my-4 md:min-w-full" />
          </div>
        </div>
      </nav>
    </>
  )
}
