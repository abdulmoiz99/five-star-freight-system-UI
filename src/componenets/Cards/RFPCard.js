import React, { useState, useEffect } from 'react'
import { baseURL, getStorage } from '../../shared/LoacalStorage'
import Alert from '../Alerts/Alert'
import { LoadingButton, SubmitButton } from '../_Global/_Button';
import { FileInput, SelectMultiple } from '../_Global/_Input';
import { FH6 } from '../_Global/_Heading';

function RFPCard() {
  const [carrier, setCarrier] = useState({
    label: '',
    value: '',
  })
  const [carrierList, setCarrierList] = useState("");
  const [file, setFile] = useState("");

  const [processing, setProccesing] = useState(false);

  const [alert, setAlert] = useState({
    display: false,
    message: '',
    success: false
  })

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

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(file)
  }

  const renderAlert = () => {
    if (alert.display) {
      return (<Alert message={alert.message} success={alert.success} />)
    }
  }
  const handleMultiSelect = (selected) => {
    setCarrier(selected)
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full  mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <FH6 Text="Request for proposal" />
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit} >
            <br />
            {renderAlert()}

            <div className="flex flex-wrap">
              <SelectMultiple Label="Carriers" List={carrierList} Handler={handleMultiSelect} Value={carrier} />
              <FileInput file={file} onChange={handleFileChange} Description="XLSX or CSV files upto 10 MB"/>
            </div>

            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                {!processing ?

                  <SubmitButton Text="Upload" />
                  :
                  <LoadingButton Text=" Processing" />
                }
              </div>
            </div>
          </form>
        </div>
      </div >
    </>
  )
}
export default RFPCard

