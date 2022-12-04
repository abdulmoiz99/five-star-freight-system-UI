import React, { useState, useEffect } from 'react'
import { baseURL, getStorage } from '../../shared/LoacalStorage'
import Table from './_Table'

function AssignShipperTable() {
  const [reportList, setReportList] = useState([]);
  var columns = [
    { name: "Name" },
    { name: "Email" },
  ]

  useEffect(() => {
    populateTableData()
  }, []);

  const populateTableData = async () => {
    let token = getStorage('token')
    const response = await fetch(
      `${baseURL()}/api/Carrier/assign-shippers`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const data = await response.json()
    setReportList(data.result)
  }
  const reportReportList = (reportList) => {
    return (
      <>
        {reportList?.map((report) => (
          <tr key={Math.random()}>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center">
              <span className="ml-3 font-bold text-blueGray-600"  >
                {report.name}
              </span>
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              {report.email}
            </td>
          </tr>
        ))
        }
      </>
    )
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full  lg:w-6/12 mb-6 shadow-lg rounded bg-white" >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-bold text-lg text-blueGray-700"  >
                Shippers
              </h3>
            </div>
          </div>
        </div>
        <Table columns={columns} reportReportList={reportReportList(reportList)} />
      </div>
    </>
  )
}

export default AssignShipperTable
