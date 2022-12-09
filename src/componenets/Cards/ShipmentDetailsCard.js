import React, { useState, useEffect } from 'react';
import { baseURL, getStorage } from '../../shared/LoacalStorage';

function ShipmentDetailsCard() {
    const [data, setData] = useState([]);

    const getShipmentDetails = async () => {
        const id = new URLSearchParams(window.location.search).get('id');
        let token = getStorage('token')
        const response = await fetch(
            `${baseURL()}/api/Shipment/order-details?orderId=${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        )
        const data = await response.json()
        setData(data.result)
    }
    useEffect(() => {
        getShipmentDetails()
    }, []);
   
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full  shadow-lg rounded">
                <div className="p-4 flex-auto">
                    <div className="relative">

                        <Header Text = "Shipment Info" />
                        <Label Key="Load ID: " Value={data.loadId} />
                        <Label Key="PO#: " Value={data.purchaseOrderNumber} />
                        <Label Key="Type of truck: " Value={data.truckType} />
                        <Label Key="Length of truck:" Value={data.truckLength} />
                        <Label Key="Commodities: " Value={data.comodities} />
                        <Label Key="Temperature(Degrees): " Value={data.temperature} />
                        <Label Key="Quantity of pallets: " Value={data.palletCount} />
                        <Label Key="Quantity of trucks: " Value={data.truckCount} />
                        <Label Key=" Weight: " Value={data.weight} />
                        <Label Key="ShippingNotes: " Value={data.shippingNotes} />
                        <Label Key="Delivery notes: " Value={data.deliveryNotes} />

                        <hr className="my-4 md:min-w-full" />
                        <Header Text = "Pick Up Details" />
                        <Label Key="State: " Value={data.pickupLocations?.[0].state} />
                        <Label Key=" Address: " Value={data.pickupLocations?.[0].address} />
                        <Label Key="City: " Value={data.pickupLocations?.[0].city} />
                        <Label Key="Zip: " Value={data.pickupLocations?.[0].zip} />
                        <Label Key="Date: " Value={data.pickupLocations?.[0].dateTime} />

                        <hr className="my-4 md:min-w-full" />

                        <Header Text = "Delivery Details" />
                        <Label Key="State: " Value={data.deliveryLocations?.[0].state} />
                        <Label Key=" Address: " Value={data.deliveryLocations?.[0].address} />
                        <Label Key="City: " Value={data.deliveryLocations?.[0].city} />
                        <Label Key="Zip: " Value={data.deliveryLocations?.[0].zip} />
                        <Label Key="Date: " Value={data.deliveryLocations?.[0].dateTime} />

                    </div >
                </div >
            </div >

        </>
    )
}
export default ShipmentDetailsCard

function Label(props) {
    return (
        <div className="mb-1 text-blueGray-600 tracking-normal  text-lg font-bold">
            {props.Key}<text className="text-blueGray-600 tracking-normal  text-xl font-semibold"> {props.Value}  </text>
        </div >
    )
}
function Header(props) {
    return (
        <div className="mb-4 mt-2 text-blueGray-600 text-xl text-center font-bold"> {props.Text}</div>
    )
}