import React from 'react'
import { getStorage } from '../../shared/LoacalStorage'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSearch, faTrash, faTruck } from '@fortawesome/free-solid-svg-icons'

export class ShipperTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { report: [], reportList: [], loading: true }
  }
  componentDidMount() {
    this.populateTableData()
  }
  handleChange = (event) => {
    console.log(event.target.value)
  }
  populateTableData = async () => {
    let token = getStorage('token')
    const response = await fetch(
      'https://fivestartlogisticsapi.azurewebsites.net/api/Admin/shippers',
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
              <span className="ml-3 font-bold text-blueGray-600"  >
                {report.name}
              </span>
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              {report.details}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              {report.taxId}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
              <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <Link
                to={"/AssignCarriers?id=" + report.id}
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                <FontAwesomeIcon icon={faTruck} />
              </Link>
              <button className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                <FontAwesomeIcon icon={faTrash} />
              </button>
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
        <div className="w-full lg:w-3/12 md:w-6/12px-4 right">
          <div className="relative w-full mb-3">
            <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="Search by name of company"
              className="px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10" />
          </div>
        </div>

        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white" >
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
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Shipper Name
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Details
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Address
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
