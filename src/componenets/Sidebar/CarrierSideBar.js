/*eslint-disable*/
import React from 'react'
import { Link } from 'react-router-dom'

export default function CarrierSideBar() {
  return (
    <>
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
          Open Loads
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
          Awarded
        </Link>
      </li>
      <li className="items-center">
        <Link
          className={
            'text-xs uppercase py-3 font-bold block ' +
            (window.location.href.indexOf('/AssignShippers') !== -1
              ? 'text-lightBlue-500 hover:text-lightBlue-600'
              : 'text-blueGray-700 hover:text-blueGray-500')
          }
          to="/AssignShippers"
        >
          <i
            className={
              'fas fa-tv mr-2 text-sm ' +
              (window.location.href.indexOf('/AssignShippers') !== -1
                ? 'opacity-75'
                : 'text-blueGray-300')
            }
          ></i>{' '}
          Shippers
        </Link>
      </li>
    </>
  )
}
