import React, { useState, useEffect } from 'react'
import { baseURL, getStorage } from '../../shared/LoacalStorage'
import { H3 } from '../_Global/_Heading';
import { NoRecordCheck, TableData, TableHeader } from '../_Global/_Table';
import Table from './_Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ActionButton, NavigationButton } from '../_Global/_Button';
import Alert from '../Alerts/Alert';
export default function AutoTenderTable() {
  const [reportList, setReportList] = useState([]);
  const [alert, setAlert] = useState({
    display: false,
    message: '',
    success: false
  })
  var columns = [
    { name: "lane Name" },
    { name: "price" },
    { name: "pick up City" },
    { name: "pick up State" },
    { name: "delivery City" },
    { name: "delivery State" },
    { name: "Actions" },
  ]
  useEffect(() => {
    populateTableData()
  }, []);
  const populateTableData = async () => {
    const response = await fetch(
      `${baseURL()}/api/Shipment/templates`, { headers: { Authorization: `Bearer ${getStorage('token')}` } },
    )
    const data = await response.json()
    setReportList(data.result)
  }
  const deleteTender = async (tenderId) => {
    setAlert({ ...alert, display: false });
    let token = getStorage('token')
    try {
      const body = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await fetch(
        `${baseURL()}/api/Shipment/delete-template?templateId=${tenderId}`,
        body,
      )
      const data = await response.json()
      if (data.success) {
        setAlert({
          ...alert,
          display: true,
          message: "Tender deleted successfully.",
          success: true
        });
        populateTableData()
      }
      else {
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
  const reportReportList = (reportList) => {
    return (
      <>
        {reportList?.map((report) => (
          <tr key={Math.random()} class="hover:bg-blueGray-100">
            <TableHeader Text={report.laneName} />
            <TableData Text={report.price} />
            <TableData Text={report.pickupCity} />
            <TableData Text={report.pickupState} />
            <TableData Text={report.deliveryCity} />
            <TableData Text={report.deliveryState} />
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              <NavigationButton Text={<FontAwesomeIcon icon={faArrowRight} />} To={"/Shipment?templateId=" + report.id} />
              <ActionButton Text={<FontAwesomeIcon icon={faTrash} />} Color="bg-red-500" Action={() => deleteTender(report.id)} />
            </td>
          </tr>
        ))
        }
        <NoRecordCheck colCount={columns.length} data={reportList} />
      </>
    )
  }
  const renderAlert = () => {
    if (alert.display) {
      return (<Alert message={alert.message} success={alert.success} />)
    }
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full  shadow-lg rounded bg-white" >
      {renderAlert()}
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <H3 Text="Auto Tenders" />
            </div>
            <NavigationButton Text="create auto tender" To="/AutoTender/New" />
          </div>
        </div>
        <Table columns={columns} reportReportList={reportReportList(reportList)} />
      </div>
    </>
  )
}