import React, { useState, useEffect } from 'react'
import { baseURL, getStorage, IsCarrier } from '../../shared/LoacalStorage'
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

  const columns = [
    { name: "ORDER ID" },
    { name: "PO NUMBER" },
    { name: "PICK UP DATE" },
    { name: "PICK UP CITY" },
    { name: "PICK UP STATE" },
    { name: "DELIVERY DATE" },
    { name: "DELIVERY CITY" },
    { name: "DELIVERY STATE" },
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
        setShowModal(false)
      } else if (data.success === false) {
        setShowModal(false)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const handleModal = (orderId, status) => {
    // only carrier can update the shipment status
    console.log("Hit")
    if (IsCarrier() && status === "Waiting") {
      setId(orderId)
      setShowModal(true)
    }
  }
  const reportReportList = (reportList) => {
    return (
      <>
        {reportList?.map((report) => (
          <tr key={report.id} class="hover:bg-blueGray-100">
            <th className="border-t-0 border-l-0 border-r-0  whitespace-nowrap p-4 text-left flex items-center">
              <button class={getColor(report.shipmentStatus) + ' text-white font-semibold uppercase text-sm py-1 px-3 rounded shadow hover:shadow-md  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'}
                onClick={() => handleModal(report.id, report.shipmentStatus)}
              >
                {report.loadId}
              </button>
            </th>
            <TableData Text={report.purchaseOrderNumber} />
            <TableData Text={removeTime(report.pickUpDateTime)} />
            <TableData Text={report.pickUpCity} />
            <TableData Text={report.pickUpState} />
            <TableData Text={removeTime(report.deliveryDateTime)} />
            <TableData Text={report.deliveryCity} />
            <TableData Text={report.deliveryState} />
            <TableData Text={report.carrierName} />
            <TableData Text={report.driverStatus} />
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
        <NoRecordCheck colCount={columns.length} data={reportList} />
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
        <ShipmentUpdateModal showModal={showModal} setShowModal={setShowModal} orderId={id} handler={() => handleStatusChange()} />
      </div>
    </>
  )
}


