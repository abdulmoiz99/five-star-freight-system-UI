import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { getStorage } from '../../shared/LoacalStorage'
import { Link } from 'react-router-dom'

export class AssignCarrierTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { report: [], reportList: [], loading: true }
  }
  componentDidMount() {
    // this.populateTableData()
  }
  populateTableData = async () => {
    let token = getStorage('token')
    const response = await fetch(
      'https://fivestartlogisticsapi.azurewebsites.net/api/Shipment/orders',
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
        <tr>
          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center">
            <span className="ml-3 font-bold text-blueGray-600"  >
              Carrier 1
            </span>
          </th>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
            001122
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
            98567
          </td>

          <td className="border-t-0  align-middle  text-sm whitespace-nowrap p-5">
            <label className="cursor-pointer">
              <input
                id="customCheckLogin"
                type="checkbox"
                name='isLoadQuoted'
                value={this.state.isLoadQuoted}
                onChange={this.handleCheck}
                className="form-checkbox border border-gray-300 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
              />
            </label>
          </td>
        </tr>
        <tr>
          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center">
            <span className="ml-3 font-bold text-blueGray-600"  >
              Carrier 2
            </span>
          </th>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
            001122
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
            98567
          </td>

          <td className="border-t-0  align-middle  text-sm whitespace-nowrap p-5">
            <label className="cursor-pointer">
              <input
                id="customCheckLogin"
                type="checkbox"
                name='isLoadQuoted'
                value={this.state.isLoadQuoted}
                onChange={this.handleCheck}
                className="form-checkbox border border-gray-300 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
              />
            </label>
          </td>
        </tr>
        {reportList?.map((report) => (
          <tr key={report.id}>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center">
              <span className="ml-3 font-bold text-blueGray-600"  >
                {report.purchaseOrderNumber}
              </span>
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              {report.pickUpDateTime}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              {report.deliveryDateTime}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              <FontAwesomeIcon icon={faCircle} color="#1AFC3F" /> delivered
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
              <Link
                to={"/CarrierDetails?id=" + report.id}
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                View Details
              </Link>
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
        <div className="relative flex flex-col min-w-0 break-words w-full  lg:w-6/12 mb-6 shadow-lg rounded bg-white" >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-bold text-lg text-blueGray-700"  >
                  Shipper: Shipper 1
                </h3>

              </div>
              <Link
                to="/Shippers"
                className="bg-emerald-500 text-white active:bg-emerald-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              >
                View Shippers
              </Link>
              <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" >
                Update
              </button>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Carrier Name
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    MC Number
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Dot Number
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Assign
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
