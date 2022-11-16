import React from 'react'
import { getStorage } from '../../shared/LoacalStorage'
import Alert from '../Alerts/Alert'
import axios from 'axios'
import Select from 'react-select'
import { typesOfTrucks, lengthOfTrucks, typesOfCommodities } from '../../shared/DropDownCache'

export class AddShipment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayAlert: false,
      success: true,
      AlertMessage: '',
      GeneratingReport: true,
    }
    this.state = {
      PickUpAddress: '',
      PickUpState: '',
      PickUpZip: '',
      PickUpDateTime: '',
      DeliveryAddress: '',
      DeliveryState: '',
      DeliveryZip: '',
      DeliveryDateTime: '',
      PONumber: '',
      TypeOfTruck: '',
      LengthOfTruck: '',
      Commodities: '',
      Temperature: '',
      QuantityOfPallets: '',
      QuantityOfTrucks: '',
      AlreadyHasAppointment: '',
      ShippingNotes: '',
      DeliveryNotes: '',
    }
  }
  componentDidMount() {
    this.setState({ GeneratingReport: false })
  }
  handleSubmission = async (event) => {
    event.preventDefault()
    this.setState({ displayAlert: false, GeneratingReport: true })
    const {
      PickUpAddress,
      PickUpState,
      PickUpZip,
      PickUpDateTime,
      DeliveryAddress,
      DeliveryState,
      DeliveryZip,
      DeliveryDateTime,
      PONumber,
      TypeOfTruck,
      LengthOfTruck,
      Commodities,
      Temperature,
      QuantityOfPallets,
      QuantityOfTrucks,
      AlreadyHasAppointment,
      ShippingNotes,
      DeliveryNotes,
    } = this.state

    let token = getStorage('token')
    try {
      let url = `https://youco2api.azurewebsites.net/api/Business/add`
      const resp = await axios.post(url, {
        params: {
          PickUpAddress: PickUpAddress,
          PickUpState: PickUpState,
          PickUpZip: PickUpZip,
          PickUpDateTime: PickUpDateTime,
          DeliveryAddress: DeliveryAddress,
          DeliveryState: DeliveryState,
          DeliveryZip: DeliveryZip,
          DeliveryDateTime: DeliveryDateTime,
          PONumber: PONumber,
          TypeOfTruck: TypeOfTruck,
          LengthOfTruck: LengthOfTruck,
          Commodities: Commodities,
          Temperature: Temperature,
          QuantityOfPallets: QuantityOfPallets,
          QuantityOfTrucks: QuantityOfTrucks,
          AlreadyHasAppointment: AlreadyHasAppointment,
          ShippingNotes: ShippingNotes,
          DeliveryNotes: DeliveryNotes,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.data.success === true) {
        this.props.onSelect(event)
        this.props.UpdateReportStatus(event)
      } else if (resp.data.success === false) {
        this.setState({ displayAlert: true, AlertMessage: resp.data.errors[0], success: false, })
      }
    } catch (e) {
      console.log(e)
    }
    this.setState({ GeneratingReport: false })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
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
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Create New Order
              </h6>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                View Shipments
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={this.handleSubmission}>
              {this.renderAlert()}
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Shipment Details
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      PO#{' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required={!this.state.isDraft}
                      name="BusinessName"
                      value={this.state.BusinessName}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Type of Truck
                    </label>
                    <Select
                      options={typesOfTrucks}
                      value={{ value: this.state.MainVentilationSource, label: this.state.MainVentilationSource }}
                      onChange={(selectedOption) => {
                        this.setState({
                          MainVentilationSource: selectedOption.value,
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Length of truck{' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <Select
                      options={lengthOfTrucks}
                      value={{ value: this.state.MainVentilationSource, label: this.state.MainVentilationSource }}
                      onChange={(selectedOption) => {
                        this.setState({
                          MainVentilationSource: selectedOption.value,
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Commodities
                    </label>
                    <Select
                      options={typesOfCommodities}
                      value={{ value: this.state.RegionId, label: this.state.RegionName }}
                      onChange={(selectedOption) => {
                        this.setState({ RegionId: selectedOption.value, RegionName: selectedOption.label })
                      }}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Temperature (Degrees)
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *{' '}
                      </span>
                    </label>
                    <input
                      required={!this.state.isDraft}
                      name="Address"
                      value={this.state.Address}
                      onChange={this.handleChange}
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Quantity of pallets {' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required={!this.state.isDraft}
                      name="AreaOfBuilding"
                      value={this.state.AreaOfBuilding}
                      onChange={this.handleChange}
                      type="Number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Quantity of trucks
                    </label>
                    <input
                      name="EPCRating"
                      value={this.state.EPCRating}
                      onChange={this.handleChange}
                      type="Number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Already has Appointment
                    </label>
                    <input
                      name="DECRating"
                      value={this.state.DECRating}
                      onChange={this.handleChange}
                      type="datetime-local"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Shipping notes
                    </label>
                    <input
                      name="MainVentilationSourceCapacity"
                      value={this.state.MainVentilationSourceCapacity}
                      onChange={this.handleChange}
                      type="Number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Delivery notes
                    </label>
                    <input
                      name="MainVentilationSourceCapacity"
                      value={this.state.MainVentilationSourceCapacity}
                      onChange={this.handleChange}
                      type="Number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
              </div>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Pickup Details
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Pickup Address{' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required={!this.state.isDraft}
                      name="BusinessName"
                      value={this.state.BusinessName}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      State{' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required={!this.state.isDraft}
                      name="BusinessName"
                      value={this.state.BusinessName}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div><div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Zip{' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required={!this.state.isDraft}
                      name="BusinessName"
                      value={this.state.BusinessName}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      date and time{' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required={!this.state.isDraft}
                      name="BusinessName"
                      value={this.state.BusinessName}
                      onChange={this.handleChange}
                      type="datetime-local"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
              </div>

              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Delivery Details
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Delivery Address{' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required={!this.state.isDraft}
                      name="BusinessName"
                      value={this.state.BusinessName}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      State{' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required={!this.state.isDraft}
                      name="BusinessName"
                      value={this.state.BusinessName}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div><div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Zip{' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required={!this.state.isDraft}
                      name="BusinessName"
                      value={this.state.BusinessName}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      date and time{' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required={!this.state.isDraft}
                      name="BusinessName"
                      value={this.state.BusinessName}
                      onChange={this.handleChange}
                      type="datetime-local"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
              </div>



              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  {!this.state.GeneratingReport ? (
                    <>
                      <button
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-md px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        onClick={() => this.setState({ isDraft: false })}
                        type="submit"
                      >
                        Create Shipment
                      </button>
                    </>
                  ) : (
                    <button className="bg-blueGray-700 text-white active:bg-lightBlue-400 font-bold uppercase text-md px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" disabled>
                      Creating...
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}
