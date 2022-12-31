import React, { useState, useEffect } from 'react'
import { baseURL, getStorage, IsAdmin, IsCarrier } from '../../shared/LoacalStorage'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { NoRecordCheck, TableData } from '../_Global/_Table'
import Alert from '../Alerts/Alert'
import Table from './_Table'
import DeleteModal from '../_Global/_Modal'
import ShipmentUpdateModal from '../Modals/ShipmentUpdateModal'



export function OpenShipmentTable() {
  const [reportList, setReportList] = useState([]);
  const [id, setId] = useState([]);

  //Alert Handlers
  const [alert, setAlert] = useState({
    display: false,
    message: '',
    success: false
  })
  const [showModal, setShowModal] = React.useState(false);
  const [showUpdateShipmentModal, setShowUpdateShipmentModal] = React.useState(false);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    populateTableData()
  }, []);

  const populateTableData = async () => {
    setLoading(true)
    let token = getStorage('token')
    const response = await fetch(
      `${baseURL()}/api/Shipment/orders?isOpen=false`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const data = await response.json()
    setReportList(data.result)
    setLoading(false)
  }
  const removeTime = (s) => {
    s = s?.substring(0, s?.indexOf('T'));
    return s;
  }
  const deleteShipment = async () => {
    setAlert({ ...alert, display: false });
    let token = getStorage('token')
    try {
      const body = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId: id }),
      }
      const response = await fetch(
        `${baseURL()}/api/Shipment/delete-order`,
        body,
      )
      const data = await response.json()
      if (data.success === true) {
        setAlert({
          ...alert,
          display: true,
          message: "Shipment Deleted Successfully",
          success: true
        });
        populateTableData()
      } else if (data.success === false) {
        setAlert({
          ...alert,
          display: true,
          message: data.errors[0],
          success: false
        });
      }
    } catch (e) {
      console.log(e)
    }
  }
  const renderAlert = () => {
    if (alert.display) {
      return (
        <Alert message={alert.message} success={alert.success} />
      )
    }
  }
  const getColor = (status) => {
    switch (status) {
      case "Waiting":
        return "bg-yellow-400";
      case "Approved":
        return "bg-green-500";
      case "Denied":
        return "bg-red-500";
      default:
        return "bg-yellow-400";
    }
  }
  const handleStatusChange = async (status) => {
    let token = getStorage('token')
    try {
      const body = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: id,
          orderStatusId: status
        }),
      }
      const response = await fetch(
        `${baseURL()}/api/Shipment/change-order-status`,
        body,
      )
      const data = await response.json()
      if (data.success === true) {
        populateTableData()
        setShowUpdateShipmentModal(false)
      } else if (data.success === false) {
        setShowUpdateShipmentModal(false)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const handleModal = (orderId, status) => {
    // only carrier can update the shipment status
    if (IsCarrier() && status === "Waiting") {
      setId(orderId)
      setShowUpdateShipmentModal(true)
    }
  }
  const reportReportList = (reportList) => {
    return (
      <>
        {reportList?.map((report) => (
          <article class="p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:border-cool-gray-400 hover:border-l-8 hover:border-r-8">
            <div class="flex justify-between items-center mb-2 text-gray-500">
              <h3 class="text-lg font-bold tracking-tight text-gray-600 dark:text-white">
                <span>PO# {report.purchaseOrderNumber}</span>
              </h3>
              <button class={getColor(report.shipmentStatus) + ' text-white font-semibold uppercase text-sm py-1 px-3 rounded shadow hover:shadow-md  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'}
                onClick={() => handleModal(report.id, report.shipmentStatus)}
              >
                Order#  {report.loadId}
              </button>
            </div>
            <ol class="border-l border-gray-300">
              <li>
                <div class="flex flex-start items-center ">
                  <div class="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3"></div>
                  <h4 class="text-gray-600 font-semibold text-md mb-1.5">{report.pickUpCity}, {report.pickUpState}, {report.pickupZip}</h4>
                </div>
                <div class="mt-0.5 ml-4 mb-2">
                  <p class="text-gray-500 text-sm">Date: {removeTime(report.pickUpDateTime)}</p>
                </div>
              </li>
              <li>
                <div class="flex flex-start items-center">
                  <div class="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3"></div>
                  <h4 class="text-gray-600 font-semibold text-md mb-1.5">{report.deliveryCity}, {report.deliveryState}, {report.deliveryZip}</h4>
                </div>
                <div class="mt-0.5 ml-4 mb-2">
                  <p class="text-gray-500 text-sm">Date:{removeTime(report.deliveryDateTime)}</p>
                </div>
              </li>
            </ol>
            <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded text-blueGray-600 bg-blueGray-200  last:mr-0 mr-1">
              CARRIER: {report.carrierName}
            </span>
            <span className="text-sm font-semibold inline-block py-1 px-2 uppercase  rounded text-blueGray-600 bg-blueGray-200  last:mr-0 mr-1">
              DRIVER STATUS: {report.driverStatus}
            </span>
            <div class="pt-3 flex justify-between items-center">
              <div class="flex items-center space-x-4">
                {!IsCarrier() &&
                  <button className="bg-red-100 hover:bg-red-500 text-red-500 hover:text-white  active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                    onClick={() => { setShowModal(true); setId(report.id); setAlert({ ...alert, display: false }) }}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete Shipment
                  </button>
                }
              </div>
              {IsCarrier() ?
                <Link
                  to={"/viewShipments/DriverStatus?id=" + report.id}
                  className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  Update Driver Status
                  <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </Link>
                :
                <Link
                  to={"/ViewShipments/Details?id=" + report.id}
                  className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  View Details
                  <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </Link>
              }
            </div>
          </article>
        ))
        }
      </>
    )
  }
  const LoadingCards = ({ count, isLoading }) => {
    return (
      <div class="grid gap-2 lg:grid-cols-2 ">
        {isLoading && Array.from({ length: count }).map((_, index) => (
          <article class="p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800">
            <div class="flex justify-between items-center mb-2 text-gray-500 animate-pulse">
              <div class="w-full h-5 bg-gray-300 rounded-lg dark:bg-gray-700"></div>
            </div>
            <div class="flex justify-between items-center mb-2 text-gray-500 animate-pulse">
              <div class="w-full h-3 bg-gray-300 rounded-lg dark:bg-gray-700"></div>
            </div>
            <div class="flex justify-between items-center mb-2 text-gray-500 animate-pulse">
              <div class="w-full h-5 bg-gray-300 rounded-lg dark:bg-gray-700"></div>
            </div>
            <div class="flex justify-between items-center mb-2 text-gray-500 animate-pulse">
              <div class="w-full h-3 bg-gray-300 rounded-lg dark:bg-gray-700"></div>
            </div>
            <div class="flex justify-between items-center mb-2 text-gray-500 animate-pulse">
              <div class="w-full h-5 bg-gray-300 rounded-lg dark:bg-gray-700"></div>
            </div>
            <div class="flex justify-between items-center mb-2 text-gray-500 animate-pulse">
              <div class="w-full h-3 bg-gray-300 rounded-lg dark:bg-gray-700"></div>
            </div>
          </article>
        ))}
      </div>
    )
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded " >
        {renderAlert()}
        <div class="grid gap-2 lg:grid-cols-2">
          {reportReportList(reportList)}
        </div>
        <LoadingCards count={4} isLoading={isLoading} />
        <DeleteModal showModal={showModal} setShowModal={setShowModal} deleteHandler={deleteShipment} />
        <ShipmentUpdateModal showModal={showUpdateShipmentModal} setShowModal={setShowUpdateShipmentModal} orderId={id} handler={handleStatusChange} />
      </div>
    </>
  )
}


