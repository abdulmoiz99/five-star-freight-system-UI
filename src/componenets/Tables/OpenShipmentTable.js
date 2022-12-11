import React, { useState, useEffect } from 'react'
import { baseURL, getStorage, IsCarrier } from '../../shared/LoacalStorage'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { NoRecordCheck } from '../_Global/_Table'
import Alert from '../Alerts/Alert'
import Table from './_Table'
import DeleteModal from '../_Global/_Modal'



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

  var columns = [
    { name: "ORDER ID" },
    { name: "PO NUMBER" },
    { name: "PICK UP DATE" },
    { name: "DELIVERY DATE" },
    { name: "CARRIER" },
    { name: "DRIVER STATUS" },
    { name: "ACTIONS" },

  ]

  useEffect(() => {
    populateTableData()
  }, []);

  const populateTableData = async () => {
    let token = getStorage('token')
    const response = await fetch(
      `${baseURL()}/api/Shipment/orders?isOpen=false`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const data = await response.json()
    setReportList(data.result)
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
  const reportReportList = (reportList) => {
    return (
      <>
        {reportList?.map((report) => (
          <tr key={report.id}>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center">
              <span className="font-bold text-blueGray-600"  >
                {report.loadId}
              </span>
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              {report.purchaseOrderNumber}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              {report.pickUpDateTime}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              {report.deliveryDateTime}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              {report.carrierName}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              {report.driverStatus}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
              {
                IsCarrier() ?
                  <Link
                    to={"/viewShipments/DriverStatus?id=" + report.id}
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Status
                  </Link>
                  :
                  <>
                    <Link
                      to={"/ViewShipments/Details?id=" + report.id}
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                    <button className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                      onClick={() => { setShowModal(true); setId(report.id); setAlert({ ...alert, display: false }) }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    < DeleteModal showModal={showModal} setShowModal={setShowModal} deleteHandler={deleteShipment} />
                  </>

              }
            </td>
          </tr>
        ))
        }
        <NoRecordCheck colCount={7} data={reportList} />
      </>
    )
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white" >
        {renderAlert()}
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-bold text-lg text-blueGray-700"  >
                Open Shipments
              </h3>
            </div>
          </div>
        </div>
        <Table columns={columns} reportReportList={reportReportList(reportList)} />
      </div>
    </>
  )
}


