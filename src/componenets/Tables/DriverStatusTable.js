import React, { useState, useEffect } from 'react'
import { baseURL } from '../../shared/LoacalStorage'
import { NoRecordCheck } from '../_Global/_Table';
import Table from './_Table'

function DriverStatusTable() {
  const [reportList, setReportList] = useState([]);
  var columns = [
    { name: "Status" },
    { name: "Notes" },
    { name: "Timestamp" },

  ]

  useEffect(() => {
    populateTableData()
  }, []);

  const populateTableData = async () => {
    const id = new URLSearchParams(window.location.search).get('id');

    const response = await fetch(
      `${baseURL()}/api/Shipment/get-driver-status?orderId=${id}`,
    )
    const data = await response.json()
    setReportList(data.result)
  }
  const reportReportList = (reportList) => {
    return (
      <>
        {reportList?.map((report) => (
          <tr key={Math.random()}  class="hover:bg-blueGray-100">
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center">
              <span className="font-bold text-blueGray-600"  >
                {report.status}
              </span>
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              {report.notes}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              {report.timeStamp}
            </td>
          </tr>
        ))
        }
        <NoRecordCheck colCount={3} data={reportList} />
      </>
    )
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full  shadow-lg rounded bg-white" >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-bold text-lg text-blueGray-700"  >
                Driver Status
              </h3>
            </div>
          </div>
        </div>
        <Table columns={columns} reportReportList={reportReportList(reportList)} />
      </div>
    </>
  )
}

export default DriverStatusTable
