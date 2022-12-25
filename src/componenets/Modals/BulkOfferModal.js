import React, { useState } from "react";
import { baseURL, getStorage } from "../../shared/LoacalStorage";
import { LoadingButton } from "../_Global/_Button";
import { FileInput } from "../_Global/_Input";
import Alert from "../Alerts/Alert";
import axios from 'axios'

export default function BulkOfferModal(props) {
    const [shipper, setShipper] = useState({
        label: '',
        value: '',
    })
    const [file, setFile] = useState("");

    const [processing, setProccesing] = useState(false);

    const [alert, setAlert] = useState({
        display: false,
        message: '',
        success: false
    })
    const handleFileUpload = async () => {
        setProccesing(true)
        setAlert({ ...alert, display: false });
        try {
            let token = getStorage('token')
            let formData = new FormData()
            formData.append('fromFile', file.name)
            formData.append('file', file)
            let url = `${baseURL()}/api/Bidding/bulk-offer`
            const resp = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (resp.data.success === true) {
                setAlert({
                    ...alert,
                    display: true,
                    message: "Offer Sent Successfully",
                    success: true
                });
            }
            else if (resp.data.success === false) {
                setAlert({
                    ...alert,
                    display: true,
                    message: resp.data.errors[0],
                    success: false
                });
            }

        } catch (e) {
            console.log(e)
        }
        setProccesing(false)
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }
    const handleClose = () => {
        setAlert({ ...alert, display: false });
        setFile("")
        props.setShowModal(false)
    }
    const renderAlert = () => {
        if (alert.display) {
            return (
                <Alert message={alert.message} success={alert.success} />
            )
        }
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
                                        Bulk Offer
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={handleClose}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none hover:shadow-xl">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="w-full px-4 pb-4 pt-4">
                                    {renderAlert()}
                                    <label className="block uppercase text-blueGray-600 text-sm font-bold mb-2 pl-5">
                                        Upload File
                                    </label>
                                    <FileInput file={file} onChange={handleFileChange} Description="XLSX file upto 10 MB" />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-1 border-t border-solid border-blueGray-200 rounded-b">
                                    {!processing ?
                                        <>
                                            < button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={handleClose}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={handleFileUpload}
                                            >
                                                Upload
                                            </button>
                                        </>
                                        :
                                        <LoadingButton Text="Uploading" />
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