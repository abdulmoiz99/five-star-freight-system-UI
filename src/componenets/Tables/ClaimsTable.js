import React, { useEffect, useState } from 'react'
import { baseURL, getStorage, getUserRole } from '../../shared/LoacalStorage'
import { NavigationButton } from '../_Global/_Button';
import { NoRecordCheck, TableData, TableHeader } from '../_Global/_Table';
import Table from './_Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import UpdateClaimModal from '../Modals/UpdateClaimModal';
import Alert from '../Alerts/Alert';

export function ClaimsTable() {
  const [reportList, setReportList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');
  //Alert Handlers
  const [alert, setAlert] = useState({
    display: false,
    message: '',
    success: false
  })
  const columns = [
    { name: "Claim No" },
    { name: "Description" },
    { name: "Dollar value of loss" },
    { name: "Status" },
    getUserRole() === "CARRIER" ? { name: "Shipper" } : null,
    getUserRole() === "SHIPPER" ? { name: "Carrier" } : null,
    getUserRole() === "ADMIN" ? { name: "Shipper" } : null,
    getUserRole() === "ADMIN" ? { name: "Carrier" } : null,
    (getUserRole() === "ADMIN" || getUserRole() === "CARRIER") ? { name: "Action" } : null,

  ].filter(x => x !== null)

  useEffect(() => {
    populateTableData()
  }, []);

  const populateTableData = async () => {
    let token = getStorage('token')
    const response = await fetch(
      `${baseURL()}/api/ShipmentClaim/list`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const data = await response.json()
    setReportList(data.result)
  }
  const updateStatusHanlder = async () => {
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
          claimId: id,
          status: status,
        })
      }
      const response = await fetch(
        `${baseURL()}/api/ShipmentClaim/update-status`,
        body,
      )
      const data = await response.json()
      setShowModal(false)
      if (data.success === true) {
        setAlert({
          ...alert, display: true, message: "Claim status updated successfully.", success: true
        });
        populateTableData()
      } else if (data.success === false) {
        setAlert({
          ...alert, display: true, message: data.errors[0], success: false
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
            <TableHeader Text={report.claimId} />
            <TableData Text={report.description} />
            <TableData Text={report.dollorValueofLoss} />
            <TableData Text={report.status} />
            {getUserRole() === "SHIPPER" && <TableData Text={report.carrier} />}
            {getUserRole() === "CARRIER" && <TableData Text={report.shipper} />}
            {getUserRole() === "ADMIN" &&
              <>
                <TableData Text={report.shipper} />
                <TableData Text={report.carrier} />
              </>
            }
            {(getUserRole() === "ADMIN" || getUserRole() === "CARRIER") &&
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                <button className="bg-lightBlue-500 text-white active:bg-lightBlue-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                  onClick={() => { setShowModal(true); setId(report.claimUid); setAlert({ ...alert, display: false }) }}
                >
                  <FontAwesomeIcon icon={faRefresh} />
                </button>
              </td>
            }
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
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white" >
        {renderAlert()}
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-bold text-lg text-blueGray-700"  >
                Claims
              </h3>
            </div>
            {getUserRole() === "SHIPPER" &&
              <NavigationButton To="/Claims/FileClaim" Text="File Claim" />
            }
          </div>
        </div>
        <Table columns={columns} reportReportList={reportReportList(reportList)} />
        <UpdateClaimModal showModal={showModal} setShowModal={setShowModal} status={status} setStatus={setStatus} handler={updateStatusHanlder} />
      </div>
    </>
  )
}
