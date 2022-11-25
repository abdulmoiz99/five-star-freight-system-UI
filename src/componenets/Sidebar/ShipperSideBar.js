/*eslint-disable*/
import React from 'react'
import { Link } from 'react-router-dom'

export default function ShipperSideBar() {
  return (
    <>
      <li className="items-center">
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
          Create Load
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
          Load Status
        </Link>
      </li>
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
          Freight Spend
        </Link>
      </li>
      <li className="items-center">
        <Link
          className={
            'text-xs uppercase py-3 font-bold block ' +
            (window.location.href.indexOf('/ShipperCarriers') !== -1
              ? 'text-lightBlue-500 hover:text-lightBlue-600'
              : 'text-blueGray-700 hover:text-blueGray-500')
          }
          to="/ShipperCarriers"
        >
          <i
            className={
              'fas fa-tv mr-2 text-sm ' +
              (window.location.href.indexOf('/ShipperCarriers') !== -1
                ? 'opacity-75'
                : 'text-blueGray-300')
            }
          ></i>{' '}
          Carriers
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
    </>
  )
}
