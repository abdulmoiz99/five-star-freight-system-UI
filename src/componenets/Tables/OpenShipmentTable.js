import React from 'react'
import { baseURL, getStorage, IsCarrier } from '../../shared/LoacalStorage'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

export class OpenShipmentTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { report: [], reportList: [], loading: true }
  }
  componentDidMount() {
    this.populateTableData()
  }
  populateTableData = async () => {
    let token = getStorage('token')
    const response = await fetch(
      `${baseURL()}/api/Shipment/orders?isOpen=false`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const data = await response.json()
    this.setState({
      reportList: data.result,
      loading: false,
    })
  }
  reportReportList(reportList) {
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
                  <Link
                    to={"/ViewShipments/Details?id=" + report.id}
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
              }
            </td>
          </tr>
        ))
        }
      </>
    )
  }

  render() {
    return (
      <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white" >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-bold text-lg text-blueGray-700"  >
                  Open Shipments
                </h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Order Id
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    PO Number
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Pick up date
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Delivery date
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Carrier
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Driver Status
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>{this.reportReportList(this.state.reportList)}</tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}
