import React, { useState, useEffect } from 'react';
import { baseURL, getStorage, getUserRole } from '../../shared/LoacalStorage';
import Alert from '../Alerts/Alert';
import { ActionButton } from '../_Global/_Button';

function ShipmentDetailsCard() {
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState({
        display: false,
        message: '',
        success: false
    })
    const [isLoading, setLoading] = useState(false);

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

    const renderAlert = () => {
        if (alert.display) {
            return (<Alert message={alert.message} success={alert.success} />)
        }
    }
    const requestPOD = async () => {
        const orderId = new URLSearchParams(window.location.search).get('id');
        setAlert({ ...alert, display: false });
        setLoading(true)
        let token = getStorage('token')
        try {
            const body = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    orderId: orderId,
                }),
            }
            const response = await fetch(
                `${baseURL()}/api/Shipment/request-pod`,
                body,
            )
            const data = await response.json()
            if (data.success) {
                setAlert({
                    ...alert,
                    display: true,
                    message: "POD request has been sent successfully.",
                    success: true
                });
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
        setLoading(false)
    }


    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full  shadow-lg rounded">
                <div className="p-4 flex-auto">
                    <div className="relative">
                        {renderAlert()}
                        <Header Text="Shipment Info" />
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
                        <Header Text="Pick Up Details" />

                        <Label Value={data.pickupLocations?.[0].address + ": " + data.pickupLocations?.[0].state + ", " + data.pickupLocations?.[0].city + ", " + data.pickupLocations?.[0].zip} />
                        <Label Key="Date: " Value={data.pickupLocations?.[0].dateTime} />

                        <hr className="my-4 md:min-w-full" />

                        <Header Text="Delivery Details" />
                        <Label Value={data.deliveryLocations?.[0].address + ": " + data.deliveryLocations?.[0].state + ", " + data.deliveryLocations?.[0].city + ", " + data.deliveryLocations?.[0].zip} />
                        <Label Key="Date: " Value={data.deliveryLocations?.[0].dateTime} />

                    </div >
                    {getUserRole() === "SHIPPER" && data.driverStatus ==="Delivered" &&
                        <div className="mb-2 mt-2 text-center">
                            <ActionButton Text="Request POD" Action={requestPOD} />
                        </div>
                    }
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