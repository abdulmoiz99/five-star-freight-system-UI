import React from 'react'
import { getStorage } from '../../shared/LoacalStorage'
import { Link } from 'react-router-dom'
import Alert from '../Alerts/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export class AssignCarrierTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayAlert: false,
      success: true,
      AlertMessage: '',
      Processing: true,
    }
    this.state = { report: [], reportList: [], loading: true }
    this.state = { assignCarrier: [] }
  }
  componentDidMount() {
    this.setState({ GeneratingReport: false })
    this.populateTableData()
  }
  handleSearch = (event) => {
    const filterDataSet = this.state.report.filter(
      d => d.mcNumber.includes(event.target.value)
    );
    this.setState({
      reportList: filterDataSet,
    })
  }
  populateTableData = async () => {
    let token = getStorage('token')
    const id = new URLSearchParams(window.location.search).get('id');
    let carriers;
    const response = await fetch(
      `https://fivestartlogisticsapi.azurewebsites.net/api/Admin/carriers?shipperId=${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const data = await response.json()
    this.setState({
      report: data.result,
      reportList: data.result,
      loading: false,
    }, () => {
      carriers = this.state.reportList.map((element) => ({ id: element.id, isAssign: element.isSelected }))
      this.setState({ assignCarrier: carriers })
    })
  }
  upsert = (array, element) => { // (1)
    const i = array.findIndex(_element => _element.id === element.id);
    if (i > -1) array[i] = element; // (2)
    else array.push(element);
  }
  handleCheck = (event) => {
    const obj = { 'id': event.target.id, 'isAssign': event.target.checked };
    this.upsert(this.state.assignCarrier, obj)
    console.log(this.state.assignCarrier)
  }
  AssignCarriers = async () => {
    this.setState({ Processing: true })
    const carrierIds = this.state.assignCarrier.filter(carrier => carrier.isAssign === true).map(c => c.id);
    console.log(carrierIds)
    const shipperId = new URLSearchParams(window.location.search).get('id');
    let token = getStorage('token')
    try {
      const body = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shipperId: shipperId,
          carrierIds: carrierIds,
        }),
      }
      const response = await fetch(
        'https://fivestartlogisticsapi.azurewebsites.net/api/Admin/assign-carriers',
        body,
      )
      const data = await response.json()
      if (data.success === true) {
        this.setState({ displayAlert: true, AlertMessage: "Carrier assigned successfully.", success: true, })
      } else if (data.success === false) {
        this.setState({ displayAlert: true, AlertMessage: data.errors[0], success: false, })
      }
    } catch (e) {
      console.log(e)
    }
    this.setState({ Processing: false })

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
              {report.mcNumber}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
              {report.dotNumber}
            </td>
            <td className="border-t-0  align-middle  text-sm whitespace-nowrap p-5">
              <label className="cursor-pointer">
                <input
                  id={report.id}
                  type="checkbox"
                  name='isLoadQuoted'
                  defaultChecked={report.isSelected}
                  value={this.state.isLoadQuoted}
                  onChange={this.handleCheck}
                  className="form-checkbox border border-gray-300 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                />
              </label>
            </td>
          </tr>
        ))
        }
      </>
    )
  }
  renderAlert = () => {
    if (this.state.displayAlert) {
      return (
        <>
          <Alert message={this.state.AlertMessage} success={this.state.success} />
        </>
      )
    }
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
              onChange={this.handleSearch}
              placeholder="Search by MC#"
              className="px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10" />
          </div>
        </div>
        <div className="relative flex flex-col min-w-0 break-words w-full  lg:w-6/12 mb-6 shadow-lg rounded bg-white" >
          {this.renderAlert()}
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
              {!this.state.Processing ? (
                <>
                  <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    onClick={this.AssignCarriers}
                  >
                    Update
                  </button>
                </>
              ) : (
                <button
                  className="bg-blueGray-700 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                >
                  Updating...
                </button>
              )}
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse" id="assignCarrier-dataset">
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
