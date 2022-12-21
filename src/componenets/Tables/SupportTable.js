import React, { useState } from 'react'
import { getUserRole } from '../../shared/LoacalStorage'
import { NavigationButton } from '../_Global/_Button';
import Table from './_Table'

export function SupportTable() {
  const [reportList, setReportList] = useState([]);
  const columns = [
    { name: "Ticket No" },
    { name: "Type" },
    { name: "Description" },
    { name: "Status" },
    getUserRole() === "ADMIN" ? { name: "Action" } : null,
  ].filter(x => x !== null)

  const reportReportList = (reportList) => {
    return (
      <>
      </>
    )
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white" >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-bold text-lg text-blueGray-700"  >
                Support Tickets
              </h3>
            </div>
            {getUserRole() === "SHIPPER" || getUserRole() === "CARRIER" ?
              <NavigationButton To="/Support/CreateTicket" Text="Open Ticket" />
              : null
            }
          </div>
        </div>
        <Table columns={columns} reportReportList={reportReportList(reportList)} />
      </div>
    </>
  )
}
