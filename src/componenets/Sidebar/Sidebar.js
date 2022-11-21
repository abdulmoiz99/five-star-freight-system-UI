/*eslint-disable*/
import React from 'react'
import { Link } from 'react-router-dom'

// import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
// import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar({ isAdmin }) {
  const [collapseShow, setCollapseShow] = React.useState('hidden')
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}

          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            Logistics
          </Link>
          {/* Collapse */}
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {!isAdmin ? (
                <div>
                  {/* <li className="items-center">
                    <Link
                      className={
                        'text-xs uppercase py-3 font-bold block ' +
                        (window.location.href.indexOf('/Shipment') !== -1
                          ? 'text-lightBlue-500 hover:text-lightBlue-600'
                          : 'text-blueGray-700 hover:text-blueGray-500')
                      }
                      to="/Shipment"
                    >
                      <i
                        className={
                          'fas fa-tv mr-2 text-sm ' +
                          (window.location.href.indexOf('/Shipment') !== -1
                            ? 'opacity-75'
                            : 'text-blueGray-300')
                        }
                      ></i>{' '}
                      Create New Order
                    </Link>
                  </li>
                  <li className="items-center">
                    <Link
                      className={
                        'text-xs uppercase py-3 font-bold block ' +
                        (window.location.href.indexOf('/viewShipments') !== -1
                          ? 'text-lightBlue-500 hover:text-lightBlue-600'
                          : 'text-blueGray-700 hover:text-blueGray-500')
                      }
                      to="/viewShipments"
                    >
                      <i
                        className={
                          'fas fa-tv mr-2 text-sm ' +
                          (window.location.href.indexOf('/viewShipments') !== -1
                            ? 'opacity-75'
                            : 'text-blueGray-300')
                        }
                      ></i>{' '}
                     load status
                    </Link>
                  </li>
                  <li className="items-center">
                    <Link
                      className={
                        'text-xs uppercase py-3 font-bold block ' +
                        (window.location.href.indexOf('/ShipperBids') !== -1
                          ? 'text-lightBlue-500 hover:text-lightBlue-600'
                          : 'text-blueGray-700 hover:text-blueGray-500')
                      }
                      to="/ShipperBids"
                    >
                      <i
                        className={
                          'fas fa-tv mr-2 text-sm ' +
                          (window.location.href.indexOf('/ShipperBids') !== -1
                            ? 'opacity-75'
                            : 'text-blueGray-300')
                        }
                      ></i>{' '}
                      Bids
                    </Link>
                  </li>
                  <li className="items-center">
                    <Link
                      className={
                        'text-xs uppercase py-3 font-bold block ' +
                        (window.location.href.indexOf('/FreightSpend') !== -1
                          ? 'text-lightBlue-500 hover:text-lightBlue-600'
                          : 'text-blueGray-700 hover:text-blueGray-500')
                      }
                      to="/Shipment"
                    >
                      <i
                        className={
                          'fas fa-tv mr-2 text-sm ' +
                          (window.location.href.indexOf('/FreightSpend') !== -1
                            ? 'opacity-75'
                            : 'text-blueGray-300')
                        }
                      ></i>{' '}
                      Freight Spend
                    </Link>
                  </li> */}
                  <li className="items-center">
                    <Link
                      className={
                        'text-xs uppercase py-3 font-bold block ' +
                        (window.location.href.indexOf('/Carriers') !== -1
                          ? 'text-lightBlue-500 hover:text-lightBlue-600'
                          : 'text-blueGray-700 hover:text-blueGray-500')
                      }
                      to="/Carriers"
                    >
                      <i
                        className={
                          'fas fa-tv mr-2 text-sm ' +
                          (window.location.href.indexOf('/Carriers') !== -1
                            ? 'opacity-75'
                            : 'text-blueGray-300')
                        }
                      ></i>{' '}
                      Carriers
                    </Link>
                  </li>
                  {/* <li className="items-center">
                    <Link
                      className={
                        'text-xs uppercase py-3 font-bold block ' +
                        (window.location.href.indexOf('/Options') !== -1
                          ? 'text-lightBlue-500 hover:text-lightBlue-600'
                          : 'text-blueGray-700 hover:text-blueGray-500')
                      }
                      to="/Shipment"
                    >
                      <i
                        className={
                          'fas fa-tv mr-2 text-sm ' +
                          (window.location.href.indexOf('/Options') !== -1
                            ? 'opacity-75'
                            : 'text-blueGray-300')
                        }
                      ></i>{' '}
                      Options
                    </Link>
                  </li> */}
                </div>

              ) : (
                <li className="items-center">
                  <Link
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (window.location.href.indexOf('/AdminPage') !== -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-blueGray-700 hover:text-blueGray-500')
                    }
                    to="/AdminPage"
                  >
                    <i
                      className={
                        'fas fa-tools mr-2 text-sm ' +
                        (window.location.href.indexOf('/AdminPage') !== -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }
                    ></i>{' '}
                    Reports
                  </Link>
                </li>
              )}
              <li className="items-center">
                <Link
                  className={
                    'text-xs uppercase py-3 font-bold block ' +
                    (window.location.href.indexOf('/Auth') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                  to="/Login"
                >
                  <i
                    className={
                      'fas fa-tv mr-2 text-sm ' +
                      (window.location.href.indexOf('/Auth') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-300')
                    }
                  ></i>{' '}
                  Logout
                </Link>
              </li>
            </ul>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
          </div>
        </div>
      </nav>
    </>
  )
}
