import React from 'react'
import { getStorage } from '../../shared/LoacalStorage'
import Alert from '../Alerts/Alert'
import { Link } from 'react-router-dom'


export class AddShipperCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayAlert: false,
      success: true,
      AlertMessage: '',
      GeneratingReport: true,
      isEdit: false
    }
    this.state = {
      PickUpAddress: '',
      PickUpState: '',
      PickUpCity: '',
      PickUpZip: '',
      PickUpDateTime: '',
      DeliveryAddress: '',
      DeliveryState: '',
      DeliveryCity: '',
      DeliveryZip: '',
      DeliveryDateTime: '',
      PONumber: '',
      TypeOfTruck: '',
      LengthOfTruck: '',
      Commodities: '',
      Temperature: '',
      QuantityOfPallets: '',
      QuantityOfTrucks: '',
      Price: '',
      Weight: '',
      ShippingNotes: '',
      DeliveryNotes: '',
      isLoadQuoted: ''
    }
  }
  componentDidMount() {
    this.setState({ GeneratingReport: false })
    this.CheckEdit();
  }
  CheckEdit = async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    this.setState({ isEdit: id ? true : false })
    if (id) {
      let token = getStorage('token')
      const response = await fetch(
        `https://fivestartlogisticsapi.azurewebsites.net/api/Shipment/order-details?orderId=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      const data = await response.json()
      this.setState({
        PickUpAddress: data.result.pickupLocations[0].address,
        PickUpState: data.result.pickupLocations[0].state,
        PickUpCity: data.result.pickupLocations[0].city,
        PickUpZip: data.result.pickupLocations[0].zip,
        PickUpDateTime: data.result.pickupLocations[0].dateTime,
        DeliveryAddress: data.result.deliveryLocations[0].address,
        DeliveryState: data.result.deliveryLocations[0].state,
        DeliveryCity: data.result.deliveryLocations[0].city,
        DeliveryZip: data.result.deliveryLocations[0].zip,
        DeliveryDateTime: data.result.deliveryLocations[0].dateTime,
        PONumber: data.result.purchaseOrderNumber,
        TypeOfTruck: data.result.truckType,
        LengthOfTruck: data.result.truckLength,
        Commodities: data.result.comodities,
        Temperature: data.result.temperature,
        QuantityOfPallets: data.result.palletCount,
        QuantityOfTrucks: data.result.truckCount,
        Price: data.result.price,
        Weight: data.result.weight,
        ShippingNotes: data.result.shippingNotes,
        DeliveryNotes: data.result.deliveryNotes,
      })
    }
  }
  clearForm = () => {
    this.setState({
      PickUpAddress: '',
      PickUpState: '',
      PickUpCity: '',
      PickUpZip: '',
      PickUpDateTime: '',
      DeliveryAddress: '',
      DeliveryState: '',
      DeliveryCity: '',
      DeliveryZip: '',
      DeliveryDateTime: '',
      PONumber: '',
      TypeOfTruck: '',
      LengthOfTruck: '',
      Commodities: '',
      Temperature: '',
      QuantityOfPallets: '',
      QuantityOfTrucks: '',
      Price: '',
      Weight: '',
      ShippingNotes: '',
      DeliveryNotes: '',
      isLoadQuoted: ''
    })
  }
  handleSubmission = async (event) => {
    event.preventDefault()
    this.setState({ displayAlert: false, GeneratingReport: true })
    const {
      PickUpAddress,
      PickUpState,
      PickUpCity,
      PickUpZip,
      PickUpDateTime,
      DeliveryAddress,
      DeliveryState,
      DeliveryCity,
      DeliveryZip,
      DeliveryDateTime,
      PONumber,
      TypeOfTruck,
      LengthOfTruck,
      Commodities,
      Temperature,
      QuantityOfPallets,
      QuantityOfTrucks,
      Price,
      Weight,
      ShippingNotes,
      DeliveryNotes,
    } = this.state
    const pickupLocations = [
      { address: PickUpAddress, state: PickUpState, city: PickUpCity, zip: PickUpZip, dateTime: PickUpDateTime ? PickUpDateTime : null },
    ];
    const deliveryLocations = [
      { address: DeliveryAddress, state: DeliveryState, city: DeliveryCity, zip: DeliveryZip, dateTime: DeliveryDateTime ? DeliveryDateTime : null },
    ];
    let token = getStorage('token')

    try {
      const body = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          purchaseOrderNumber: PONumber,
          truckType: TypeOfTruck,
          truckLength: LengthOfTruck,
          truckCount: QuantityOfTrucks,
          comodities: Commodities,
          weight: Weight,
          temperature: Temperature ? Temperature : 0,
          palletCount: QuantityOfPallets ? QuantityOfPallets : 0,
          price: Price,
          shippingNotes: ShippingNotes,
          deliveryNotes: DeliveryNotes,
          pickupLocations: pickupLocations,
          deliveryLocations: deliveryLocations
        }),
      }
      const response = await fetch(
        'https://fivestartlogisticsapi.azurewebsites.net/api/Shipment/create-order',
        body,
      )
      const data = await response.json()
      if (data.success === true) {
        this.setState({ displayAlert: true, AlertMessage: "Shipment created successfully.", success: true, })
        this.clearForm();
      } else if (data.success === false) {
        this.setState({ displayAlert: true, AlertMessage: data.errors[0], success: false, })
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
  handleCheck = (event) => {
    this.setState({
      isLoadQuoted: event.target.checked,
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
        <div className="relative flex flex-col min-w-0 break-words w-full lg:w-4/12 mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold uppercase">
                Create New Shipper
              </h6>
              <Link
                to="/Shippers"
                className="bg-emerald-500 text-white active:bg-emerald-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              >
                View Shippers
              </Link>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={this.handleSubmission}>
              <br />
              {this.renderAlert()}
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Login Details
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email{' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="PONumber"
                      value={this.state.PONumber}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Passwrd{' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="PONumber"
                      value={this.state.PONumber}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Confirm Password{' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="PONumber"
                      value={this.state.PONumber}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
              </div>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Shipper Details
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="PONumber"
                      value={this.state.PONumber}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Details
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="PONumber"
                      value={this.state.PONumber}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Address
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="PONumber"
                      value={this.state.PONumber}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Commodity
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="PONumber"
                      value={this.state.PONumber}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      TaxId
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="PONumber"
                      value={this.state.PONumber}
                      onChange={this.handleChange}
                      type="text"
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
                        type="submit"
                      >
                        Add Shipper
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
        </div >
      </>
    )
  }
}
