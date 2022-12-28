import React, { useState, useEffect } from 'react'
import { lengthOfTrucks, states, typesOfTrucks } from '../../shared/DropDownCache'
import { baseURL, getStorage } from '../../shared/LoacalStorage';
import { FH6, H6 } from '../_Global/_Heading'
import { SelectSingle } from '../_Global/_Input';
import Select from 'react-select'
import { LoadingButton, NavigationButton, SubmitButton } from '../_Global/_Button';
import Alert from '../Alerts/Alert';

function AutoTenderCard() {
  //#region Input Fields
  const [typeOfTruck, setTypeOfTruck] = useState("");
  const [lengthOfTruck, setLengthOfTruck] = useState("");
  const [commodities, setCommodities] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [quantityOfPallet, setQuantityOfPallet] = useState(null);
  const [quantityOfTruck, setQuantityOfTruck] = useState("");
  const [weight, setWeight] = useState("");
  const [shippingNotes, setShippingNotes] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [laneName, setLaneName] = useState("");
  const [price, setPrice] = useState("");
  const [carrier, setCarrier] = useState({
    label: null,
    value: null,
  })
  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [pickupState, setPickupState] = useState("");
  const [pickupZip, setPickupZip] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryState, setDeliveryState] = useState("");
  const [deliveryZip, setDeliveryZip] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  //#endregion
  const [carrierList, setCarrierList] = useState("");
  const [processing, setProcessing] = useState("");
  const [alert, setAlert] = useState({
    display: false,
    message: '',
    success: false
  })
  useEffect(() => {
    populateCarriers();
  }, []);
  const clearForm = () => {
    //#region Input Fields
    setTypeOfTruck("")
    setLengthOfTruck("")
    setCommodities("")
    setTemperature("0")
    setTemperature(null)
    setQuantityOfPallet("1")
    setQuantityOfPallet(null)
    setQuantityOfTruck("")
    setWeight("")
    setShippingNotes("")
    setDeliveryNotes("")
    setLaneName("")
    setPrice("")
    setCarrier({
      label: null,
      value: null,
    })
    setPickupAddress("")
    setPickupCity("")
    setPickupState("")
    setPickupZip("")
    setPickupDate("")
    setDeliveryAddress("")
    setDeliveryCity("")
    setDeliveryState("")
    setDeliveryZip("")
    setDeliveryDate("")
  }
  const populateCarriers = async () => {
    let token = getStorage('token')
    const response = await fetch(
      `${baseURL()}/api/Shipment/carriers`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const data = await response.json()
    setCarrierList(data.result.map((element) => ({ value: element.id, label: element.name })))
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setAlert({ ...alert, display: false });
    setProcessing(true)
    let token = getStorage('token')
    try {
      const body = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          "laneName": laneName,
          "price": price,
          "pickupCity": pickupCity,
          "pickupState": pickupState,
          "deliveryCity": deliveryCity,
          "deliveryState": deliveryState,
          "truckType": typeOfTruck,
          "truckLength": lengthOfTruck,
          "commodities": commodities,
          "weight": weight,
          "temperature": temperature,
          "palletCount": quantityOfPallet,
          "truckCount": quantityOfTruck,
          "carrierId": carrier.value,
          "shippingNotes": shippingNotes,
          "deliveryNotes": deliveryNotes,
          "pickupAddress": pickupAddress,
          "pickupZip": pickupZip,
          "deliveryAddress": deliveryAddress,
          "deliveryZip": deliveryZip
        }),
      }
      const response = await fetch(
        `${baseURL()}/api/Shipment/create-template`,
        body,
      )
      const data = await response.json()
      if (data.success) {
        setAlert({
          ...alert,
          display: true,
          message: "Tender template created successfully.",
          success: true
        });
        clearForm()
      }
      else {
        setAlert({
          ...alert,
          display: true,
          message: data.errors[0],
          success: false
        });

      }
    } catch (e) {
      console.log(e)
    }
    setProcessing(false)
  }
  const renderAlert = () => {
    if (alert.display) {
      return (<Alert message={alert.message} success={alert.success} />)
    }
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <FH6 Text="Create New Auto Tender" />
            </div>
            <NavigationButton Text="View Auto Tenders" To="/AutoTender" />
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <br />
            {renderAlert()}
            <H6 Text="Shipment Details" />
            <div className="flex flex-wrap">
              <SelectSingle Label="Type of Truck" List={typesOfTrucks} State={typeOfTruck} Setter={setTypeOfTruck} />
              <SelectSingle Label="Length of Truck" List={lengthOfTrucks} State={lengthOfTruck} Setter={setLengthOfTruck} />
              <Input Label="COMMODITIES" State={commodities} Setter={setCommodities} IsReq />
              <Input Label="TEMPERATURE (DEGREES)" State={temperature} Setter={setTemperature} Type="number" />
              <Input Label="QUANTITY OF PALLETS" State={quantityOfPallet} Setter={setQuantityOfPallet} Type="number" />
              <Input Label="QUANTITY OF TRUCKS" State={quantityOfTruck} Setter={setQuantityOfTruck} Type="number" IsReq />
              <Input Label="WEIGHT" State={weight} Setter={setWeight} Type="number" IsReq />
              <Input Label="SHIPPING NOTES" State={shippingNotes} Setter={setShippingNotes} />
              <Input Label="DELIVERY NOTES" State={deliveryNotes} Setter={setDeliveryNotes} />
            </div>


            <H6 Text="Load Details" />
            <div className="flex flex-wrap">
              <Input Label="Lane Name" State={laneName} Setter={setLaneName} IsReq />
              <Input Label="Price" State={price} Setter={setPrice} IsReq />
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Carriers
                    <span style={{ color: 'red', justifyContent: 'center' }}> {' '} *</span>
                  </label>
                  <Select
                    options={carrierList}
                    value={{ value: carrier.value, label: carrier.label }}
                    onChange={(selectedOption) => {
                      setCarrier({
                        label: selectedOption.label,
                        value: selectedOption.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <H6 Text="PICKUP DETAILS" />
            <div className="flex flex-wrap">
              <Input Label="PICKUP ADDRESS" State={pickupAddress} Setter={setPickupAddress} IsReq Size="12/12" />
              <Input Label="CITY " State={pickupCity} Setter={setPickupCity} Size="3/12" IsReq />
              <SelectSingle Label="STATE " List={states} State={pickupState} Setter={setPickupState} Size="3/12" />
              <Input Label="ZIP " State={pickupZip} Setter={setPickupZip} Size="3/12" IsReq />
              <Input Label="DATE" State={pickupDate} Setter={setPickupDate} Type="date" Size="3/12" />
            </div>
            <H6 Text="DELIVERY DETAILS" />
            <div className="flex flex-wrap">
              <Input Label="DELIVERY ADDRESS" State={deliveryAddress} Setter={setDeliveryAddress} IsReq Size="12/12" />
              <Input Label="CITY " State={deliveryCity} Setter={setDeliveryCity} Size="3/12" IsReq />
              <SelectSingle Label="STATE " List={states} State={deliveryState} Setter={setDeliveryState} Size="3/12" />
              <Input Label="ZIP " State={deliveryZip} Setter={setDeliveryZip} Size="3/12" IsReq />
              <Input Label="DATE" State={deliveryDate} Setter={setDeliveryDate} Type="date" Size="3/12" />
            </div>
            {!processing ? <SubmitButton Text="Create" /> : <LoadingButton Text="Creating" />}
          </form>
        </div>
      </div>
    </>
  )
}
export default AutoTenderCard

function checkIfNumber(event) {
  const regex = new RegExp(/(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/);
  return !event.key.match(regex) && event.preventDefault();
}
function Input({ Label, State, Setter, Type, IsReq, Size }) {
  //if undefined set the default value
  Size ??= "4/12"
  Type ??= "text"
  return (
    <div className={`w-full lg:w-${Size} px-4`}>
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          {Label}
          {IsReq && <span style={{ color: 'red', justifyContent: 'center' }}>{' '} *</span>}

        </label>
        <input
          required={IsReq}
          value={State}
          onChange={e => Setter(e.target.value)}
          type={Type}
          onKeyDown={(event) => {
            if (Type === "number") {
              checkIfNumber(event)
            }
          }}
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        />
      </div>
    </div>
  )
}