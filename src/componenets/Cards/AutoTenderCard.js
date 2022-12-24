import React, { useState, useEffect } from 'react'
import { cities, lengthOfTrucks, states, typesOfTrucks } from '../../shared/DropDownCache'
import { baseURL, getStorage } from '../../shared/LoacalStorage';
import { FH6, H6 } from '../_Global/_Heading'
import { SelectSingle } from '../_Global/_Input';
import Select from 'react-select'

function AutoTenderCard() {
  //#region Input Fields
  const [typeOfTruck, setTypeOfTruck] = useState("");
  const [lengthOfTruck, setLengthOfTruck] = useState("");
  const [commodities, setCommodities] = useState("");
  const [temperature, setTemperature] = useState("");
  const [quantityOfPallet, setQuantityOfPallet] = useState("");
  const [weight, setWeight] = useState("");
  const [shippingNotes, setShippingNotes] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [price, setPrice] = useState("");
  const [carrier, setCarrier] = useState({
    label: '',
    value: '',
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
  useEffect(() => {
    populateCarriers();
  }, []);

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


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <FH6 Text="Create New Auto Tender" />
            </div>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form >
            <H6 Text="Shipment Details" />
            <div className="flex flex-wrap">
              <SelectSingle Label="Type of Truck" List={typesOfTrucks} State={typeOfTruck} Setter={setTypeOfTruck} />
              <SelectSingle Label="Length of Truck" List={lengthOfTrucks} State={lengthOfTruck} Setter={setLengthOfTruck} />
              <Input Label="COMMODITIES" State={commodities} Setter={setCommodities} IsReq />
              <Input Label="TEMPERATURE (DEGREES)" State={temperature} Setter={setTemperature} Type="number" />
              <Input Label="QUANTITY OF PALLETS" State={quantityOfPallet} Setter={setTypeOfTruck} Type="number" />
              <Input Label="QUANTITY OF TRUCKS" State={typeOfTruck} Setter={setQuantityOfPallet} Type="number" IsReq />
              <Input Label="WEIGHT" State={weight} Setter={setWeight} Type="number" IsReq />
              <Input Label="SHIPPING NOTES" State={shippingNotes} Setter={setShippingNotes} />
              <Input Label="DELIVERY NOTES" State={deliveryNotes} Setter={setDeliveryNotes} />
            </div>

            <H6 Text="Load Details" />
            <div className="flex flex-wrap">
              <Input Label="Price" State={price} Setter={setPrice} />
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
              <SelectSingle Label="CITY " List={cities} State={pickupCity} Setter={setPickupCity} Size="3/12" />
              <SelectSingle Label="STATE " List={states} State={pickupState} Setter={setPickupState} Size="3/12" />
              <Input Label="ZIP " State={pickupZip} Setter={setPickupZip} Size="3/12" IsReq />
              <Input Label="DATE" State={pickupDate} Setter={setPickupDate} Type="date" Size="3/12" />
            </div>
            <H6 Text="DELIVERY DETAILS" />
            <div className="flex flex-wrap">
              <Input Label="DELIVERY ADDRESS" State={deliveryAddress} Setter={setDeliveryAddress} IsReq Size="12/12" />
              <SelectSingle Label="CITY " List={cities} State={deliveryCity} Setter={setDeliveryCity} Size="3/12" />
              <SelectSingle Label="STATE " List={states} State={deliveryState} Setter={setDeliveryState} Size="3/12" />
              <Input Label="ZIP " State={deliveryZip} Setter={setDeliveryZip} Size="3/12" IsReq />
              <Input Label="DATE" State={deliveryDate} Setter={setDeliveryDate} Type="date" Size="3/12" />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default AutoTenderCard


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
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        />
      </div>
    </div>
  )
}