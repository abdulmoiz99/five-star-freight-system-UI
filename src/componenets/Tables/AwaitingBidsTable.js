import React, { useState, useEffect } from 'react'
import { baseURL, getStorage, IsCarrier } from '../../shared/LoacalStorage'
import { H3 } from '../_Global/_Heading';
import { NoRecordCheck, TableData, TableHeader } from '../_Global/_Table';
import Table from './_Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel, faCheck } from '@fortawesome/free-solid-svg-icons'
import { ActionButton } from '../_Global/_Button';
import Alert from '../Alerts/Alert';
import { useNavigate } from 'react-router-dom';

export default function AwaitingBidsTable() {
  let navigate = useNavigate();
  const [reportList, setReportList] = useState([]);
  const [alert, setAlert] = useState({
    display: false,
    message: '',
    success: false
  })
  var columns = [
    { name: "PO Number" },
    { name: "Offered By Shipper" },
    { name: "Message" },
    { name: "Amount" },
    { name: "Action" },
  ]
  useEffect(() => {
    populateTableData()
  }, []);

  const populateTableData = async () => {
    if (!ValidateCarrier()) {
      // Somewhere in your code, e.g. inside a handler:
      navigate("/login");
    }
    else {
      const response = await fetch(
        `${baseURL()}/api/Bidding/selected`, { headers: { Authorization: `Bearer ${getStorage('token')}` } },
      )
      const data = await response.json()
      setReportList(data.result)
    }

  }
  const ValidateCarrier = () => {
    let token = getStorage('token')
    return (token && IsCarrier()) ? true : false
  }
  const updateStatus = async (accepted, biddingId) => {
    setAlert({ ...alert, display: false });
    let token = getStorage('token')
    try {
      const body = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          biddingId: biddingId,
          isAccepted: accepted,
        }),
      }
      const response = await fetch(
        `${baseURL()}/api/Bidding/confirm`,
        body,
      )
      const data = await response.json()
      if (data.success === true) {
        setAlert({
          ...alert,
          display: true,
          message: "Shipment Updated Successfully",
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
  const reportReportList = (reportList) => {
    return (
      <>
        {reportList?.map((report) => (
          <tr key={Math.random()} class="hover:bg-blueGray-100">
            <TableHeader Text={report.purchaseOrderNumber} />
            <TableData Text={report.offeredBy} />
            <TableData Text={report.message} />
            <TableData Text={report.amount} />
            <td className="border-t-0  align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              <ActionButton Text={<FontAwesomeIcon icon={faCheck} />} Color="bg-green-500" Action={() => updateStatus(true, report.id)} />
              <ActionButton Text={<FontAwesomeIcon icon={faCancel} />} Color="bg-red-500" Action={() => updateStatus(false, report.id)} />
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
              <H3 Text="Awaiting Bids" />
            </div>
          </div>
        </div>
        <Table columns={columns} reportReportList={reportReportList(reportList)} />
      </div>
    </>
  )
}