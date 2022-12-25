import React, { useEffect, useState } from "react";
import { baseURL, getStorage } from "../../shared/LoacalStorage";
import Select from 'react-select'
import { LoadingButton } from "../_Global/_Button";

export default function ExportBidsModal(props) {
    const [shipper, setShipper] = useState({
        label: '',
        value: '',
    })
    const [shipperList, setShipperList] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        populateShippers();
    }, []);

    const populateShippers = async () => {
        let token = getStorage('token')

        const response = await fetch(
            `${baseURL()}/api/Carrier/assign-shippers`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        )
        const data = await response.json()
        setShipperList(data.result.map((element) => ({ value: element.id, label: element.name })))
    }
    const handleFileDownload = async () => {
        setProcessing(true)
        let token = getStorage('token')
        await fetch(
            `${baseURL()}/api/Shipment/open-shipments-file?shipperId=${shipper.value}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
            .then((response) => response.blob())
            .then((blob) => {
                // Create blob link to download
                const url = window.URL.createObjectURL(new Blob([blob]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', `${shipper.label}_OpenShipments.xlsx`)
                // Append to html link element page
                document.body.appendChild(link)
                // Start download
                link.click()
                // Clean up and remove the link
                link.parentNode.removeChild(link)
            })
        setProcessing(false)
    }

    return (
        <>
            {props.showModal ? (
                <>
                    <div
                        className="justify-center items-center flex "
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '50%',
                            bottom: '50%',
                            left: '50%',
                        }}
                    >
                        <div className="relative ">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col outline-none focus:outline-none bg-white"
                                style={{ width: '400px' }}
                            >
                                {/*header*/}
                                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-xl font-semibold">
                                        Export Bids
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => props.setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none hover:shadow-xl">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="w-full px-4 pb-4 pt-4">
                                    <div className="relative w-full mb-3">
                                        <div className="w-full  px-4">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                                    Shippers
                                                    <span style={{ color: 'red', justifyContent: 'center' }}> {' '} *</span>
                                                </label>
                                                <Select
                                                    options={shipperList}
                                                    value={{ value: shipper.value, label: shipper.label }}
                                                    onChange={(selectedOption) => {
                                                        setShipper({
                                                            label: selectedOption.label,
                                                            value: selectedOption.value,
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-1 border-t border-solid border-blueGray-200 rounded-b">
                                    {!processing ?
                                        <>
                                            < button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => props.setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={handleFileDownload}
                                            >
                                                Export
                                            </button>
                                        </>
                                        :
                                        <LoadingButton Text="Downloading" />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null
            }
        </>
    );
}