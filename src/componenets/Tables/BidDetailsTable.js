import React, { useState, useEffect } from 'react'
import { baseURL, getStorage } from '../../shared/LoacalStorage'
import Alert from '../Alerts/Alert'
import { NavigationButton } from '../_Global/_Button';
import { NoRecordCheck } from '../_Global/_Table';

function BidDetailsTable() {
  const [reportList, setReportList] = useState([]);
  //Alert Handlers
  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    populateTableData()
  }, []);

  const populateTableData = async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    let token = getStorage('token')
    const response = await fetch(
      `${baseURL()}/api/Bidding/list?orderId=${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const data = await response.json()
    setReportList(data.result)
  }

  const assignCarrier = async (id) => {
    setDisplayAlert(false)
    let token = getStorage('token')
    try {
      const body = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          biddingId: id,
        }),
      }
      const response = await fetch(
        `${baseURL()}/api/Bidding/approve`,
        body,
      )
      const data = await response.json()
      setDisplayAlert(true)
      setSuccess(data.success)
      if (data.success === true) {
        setAlertMessage("Shipment assigned successfully.")
      } else if (data.success === false) {
        setAlertMessage(data.errors[0])
      }
    } catch (e) {
      console.log(e)
    }
  }
  const reportReportList = (reportList) => {
    return (
      <>
        {reportList?.map((report) => (
          <tr key={report.id}>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center">
              <span className="font-bold text-blueGray-600"  >
                {report.offeredBy}
              </span>
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              ${report.amount}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              {report.message}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
              <button
                id={report.id}
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                onClick={() => assignCarrier(report.id)}
              >
                AWARD
              </button>
            </td>
          </tr>
        ))
        }
        <NoRecordCheck colCount={4} data={reportList} />
      </>
    )
  }
  const renderAlert = () => {
    if (displayAlert) {
      return (
        <Alert message={alertMessage} success={success} />
      )
    }
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white" >
        {renderAlert()}
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-bold text-lg text-blueGray-700"  >
                Bid Details
              </h3>
            </div>
            <NavigationButton To="/ShipperBids" Text="View Bids" />
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Carrier
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Amount
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Message
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{reportReportList(reportList)}</tbody>
          </table>
        </div>
      </div>
    </>
  )
}
export default BidDetailsTable
