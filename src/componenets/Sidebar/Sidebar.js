/*eslint-disable*/
import React from 'react'
import { Link } from 'react-router-dom'
import { getStorage, getUserRole } from '../../shared/LoacalStorage'
import { SideBarButton } from '../_Global/_Button'
import AdminSideBar from './AdminSideBar'
import CarrierSideBar from './CarrierSideBar'
import ShipperSideBar from './ShipperSideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircleQuestion, faGear, faUser } from '@fortawesome/free-solid-svg-icons'

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
      <nav class="fixed top-0 left-0 w-64 h-full shadow-xl" aria-label="Sidebar">
        <div class="overflow-y-auto py-4 pt-16 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div class="text-center text-gray-500 dark:text-gray-400">
            <FontAwesomeIcon class="mx-auto mb-4 w-20 h-20 rounded-full" fill="" aria-hidden="true" icon={faUser} />
            <h3 class="text-xl font-bold tracking-tight text-gray-500 dark:text-white">
              {getStorage('username')}
            </h3>
            <Link
              to="/login"
              className="inline-flex items-center justify-center w-full py-2 px-5 my-5 text-sm font-medium text-gray-700 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <svg aria-hidden="true" class="mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              Logout
            </Link>
            <ul class="flex justify-center mb-4 space-x-1">

              <li>
                <Link
                  to="/Settings"
                  className="inline-flex text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2"
                >
                  <FontAwesomeIcon class="w-5 h-5" fill="currentColor" aria-hidden="true" icon={faGear} />
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="inline-flex text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2"
                >
                  <FontAwesomeIcon class="w-5 h-5" fill="currentColor" aria-hidden="true" icon={faBell} />
                </Link>
              </li>
              <li>
                <Link
                  to="/Support"
                  className="inline-flex text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2"
                >
                  <FontAwesomeIcon class="w-5 h-5" fill="currentColor" aria-hidden="true" icon={faCircleQuestion} />
                </Link>
              </li>
            </ul>
          </div>
          <ul class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            {role == "ADMIN" && <AdminSideBar />}
            {role == "SHIPPER" && <ShipperSideBar />}
            {role == "CARRIER" && <CarrierSideBar />}

            <li className="items-center">
              <SideBarButton To="/Claims" Text="Claims" />
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
