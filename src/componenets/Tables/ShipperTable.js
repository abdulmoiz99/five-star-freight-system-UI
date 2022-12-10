import React, { useState, useEffect } from 'react'
import { baseURL, getStorage } from '../../shared/LoacalStorage'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSearch, faTrash, faTruck } from '@fortawesome/free-solid-svg-icons'
import Alert from '../Alerts/Alert'
import Table from './_Table'

function ShipperTable() {
  const [reportList, setReportList] = useState([]);
  const [report, setReport] = useState([]);
  //Alert Handlers
  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);

  var columns = [
    { name: "Shipper Name" },
    { name: "Email" },
    { name: "Tax Id" },
    { name: "Actions" },
  ]

  useEffect(() => {
    populateTableData()
  }, []);

  const populateTableData = async () => {
    let token = getStorage('token')
    const response = await fetch(
      `${baseURL()}/api/Admin/shippers`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const data = await response.json()
    setReportList(data.result)
    setReport(data.result)
  }
  const handleSearch = (event) => {
    const filterDataSet = report.filter(
      d => d.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setReportList(filterDataSet)
  }
  const renderAlert = () => {
    if (displayAlert) {
      return (
        <Alert message={alertMessage} success={success} />
      )
    }
  }
  const deleteCarrier = async (Uid) => {
    setDisplayAlert(false)
    let token = getStorage('token')
    const body = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(
      `${baseURL()}/api/Admin/delete-user?userId=${Uid}`,
      body,
    )
    const data = await response.json()
    setDisplayAlert(true)
    setSuccess(data.success)
    if (data.success === true) {
      populateTableData()
      setAlertMessage("Shipper deleted successfully.")
    } else if (data.success === false) {
      setAlertMessage(data.errors[0])
    }
  }
  const reportReportList = (reportList) => {
    return (
      <>
        {reportList?.map((report) => (
          <tr key={report.id}>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center">
              <span className="font-bold text-blueGray-600"  >
                {report.name}
              </span>
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              {report.email}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              {report.taxId}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
              <Link
                to={"/AssignCarriers?id=" + report.id}
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                <FontAwesomeIcon icon={faTruck} />
              </Link>
              <Link
                to={"/Shippers/Edit?id=" + report.id}
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <button className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                onClick={() => deleteCarrier(report.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))
        }
      </>
    )
  }
  return (
    <>
      <div className="w-full lg:w-3/12 md:w-6/12px-4 right">
        <div className="relative w-full mb-3">
          <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search by name of company"
            className="px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10" />
        </div>
      </div>

      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white" >
        {renderAlert()}
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-bold text-lg text-blueGray-700"  >
                Shippers
              </h3>

            </div>
            <Link
              to="/AddShipper"
              className="bg-emerald-500 text-white active:bg-emerald-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Add New Shipper
            </Link>
          </div>
        </div>
        <Table columns={columns} reportReportList={reportReportList(reportList)} />
      </div>
    </>
  )
}

export default ShipperTable
