import React from 'react'
import { getStorage } from '../../shared/LoacalStorage'
import Alert from '../Alerts/Alert'
import Select from 'react-select'
import { typesOfTrucks, lengthOfTrucks } from '../../shared/DropDownCache'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollar } from '@fortawesome/free-solid-svg-icons'

export class ShipmentCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayAlert: false,
      success: true,
      AlertMessage: '',
      GeneratingReport: true,
      Carriers: [],
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
    this.populateCarriers()
    this.CheckEdit();
  }
  populateCarriers = async () => {
    let token = getStorage('token')
    const response = await fetch(
      'https://fivestartlogisticsapi.azurewebsites.net/api/Shipment/carriers',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const data = await response.json()
    this.setState({
      CarrierDropDown: data.result,

    })
    this.setState({
      Carriers: data.result.map((element) => ({ value: element.id, label: element.name }))
    })
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
      isLoadQuoted: false
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
      isLoadQuoted,
      Carrier,
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
          price: isLoadQuoted ? Price : 0,
          shippingNotes: ShippingNotes,
          deliveryNotes: DeliveryNotes,
          carrierId: isLoadQuoted ? Carrier : null,
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
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold uppercase">
                {this.state.isEdit ? "PO# " + this.state.PONumber : "Create New Order"}
              </h6>
              <Link
                to="/viewShipments"
                className="bg-emerald-500 text-white active:bg-emerald-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              >
                View Shipments
              </Link>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={this.handleSubmission}>
              <br />
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
                      required
                      name="PONumber"
                      value={this.state.PONumber}
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
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <Select
                      options={typesOfTrucks}
                      value={{ value: this.state.TypeOfTruck, label: this.state.TypeOfTruck }}
                      onChange={(selectedOption) => {
                        this.setState({
                          TypeOfTruck: selectedOption.value,
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
                      value={{ value: this.state.LengthOfTruck, label: this.state.LengthOfTruck }}
                      onChange={(selectedOption) => {
                        this.setState({
                          LengthOfTruck: selectedOption.value,
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
                      Commodities<span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="Commodities"
                      value={this.state.Commodities}
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
                      Temperature (Degrees)
                    </label>
                    <input
                      name="Temperature"
                      value={this.state.Temperature}
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
                    </label>
                    <input
                      name="QuantityOfPallets"
                      value={this.state.QuantityOfPallets}
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
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="QuantityOfTrucks"
                      value={this.state.QuantityOfTrucks}
                      onChange={this.handleChange}
                      type="Number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Weight
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="Weight"
                      value={this.state.Weight}
                      onChange={this.handleChange}
                      type="text"
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
                      name="ShippingNotes"
                      value={this.state.ShippingNotes}
                      onChange={this.handleChange}
                      type="text"
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
                      name="DeliveryNotes"
                      value={this.state.DeliveryNotes}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
              </div>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Load Status
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        name='isLoadQuoted'
                        value={this.state.isLoadQuoted}
                        onChange={this.handleCheck}
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-md font-bold text-blueGray-600">
                        Load Already Quoted?
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              {this.state.isLoadQuoted ?
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Price
                        <span style={{ color: 'red', justifyContent: 'center' }}>
                          {' '}
                          *
                        </span>
                      </label>
                      <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <FontAwesomeIcon icon={faDollar} />
                      </span>
                      <input
                        required={this.state.isLoadQuoted}
                        name="Price"
                        value={this.state.Price}
                        onChange={this.handleChange}
                        type="Number"
                        className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Carrier
                        <span style={{ color: 'red', justifyContent: 'center' }}>
                          {' '}
                          *
                        </span>
                      </label>
                      <Select
                        options={this.state.Carriers}
                        value={{ value: this.state.Carrier, label: this.state.CarrierLabel }}
                        onChange={(selectedOption) => {
                          this.setState({
                            Carrier: selectedOption.value,
                            CarrierLabel: selectedOption.label,
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>
                : null}
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
                      required
                      name="PickUpAddress"
                      value={this.state.PickUpAddress}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-3/12 px-4">
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
                      required
                      name="PickUpState"
                      value={this.state.PickUpState}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-3/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      City{' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="PickUpCity"
                      value={this.state.PickUpCity}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-3/12 px-4">
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
                      required
                      name="PickUpZip"
                      value={this.state.PickUpZip}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-3/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      date 
                    </label>
                    <input
                      name="PickUpDateTime"
                      value={this.state.PickUpDateTime}
                      onChange={this.handleChange}
                      type="date"
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
                      required
                      name="DeliveryAddress"
                      value={this.state.DeliveryAddress}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-3/12 px-4">
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
                      required
                      name="DeliveryState"
                      value={this.state.DeliveryState}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-3/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      City{' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="DeliveryCity"
                      value={this.state.DeliveryCity}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-3/12 px-4">
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
                      required
                      name="DeliveryZip"
                      value={this.state.DeliveryZip}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-3/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      date 
                    </label>
                    <input
                      name="DeliveryDateTime"
                      value={this.state.DeliveryDateTime}
                      onChange={this.handleChange}
                      type="date"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
              </div>


              {!this.state.isEdit ?
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    {!this.state.GeneratingReport ? (
                      <>
                        <button
                          className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-md px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                          type="submit"
                        >
                          {this.state.isLoadQuoted ? "Create Shipment" : "Need Quote"}
                        </button>
                      </>
                    ) : (
                      <button className="bg-blueGray-700 text-white active:bg-lightBlue-400 font-bold uppercase text-md px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" disabled>
                        Creating...
                      </button>
                    )}
                  </div>
                </div>
                : null}
            </form>
          </div>
        </div >
      </>
    )
  }
}
