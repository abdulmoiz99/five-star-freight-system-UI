import React, { useState, useEffect } from 'react'
import { baseURL, getStorage } from '../../shared/LoacalStorage'
import Alert from '../Alerts/Alert'
import { LoadingButton, SubmitButton } from '../_Global/_Button';
import { FileInput, Input } from '../_Global/_Input';
import Select from 'react-select'

function FileClaimCard() {
  const [dollarValue, setDollarValue] = useState("");
  const [description, setDescription] = useState("");
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
  const clearForm = () => {
    setDollarValue('');
    setDescription('')
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(file)
  }
  const renderAlert = () => {
    if (alert.display) {
      return (
        <Alert message={alert.message} success={alert.success} />
      )
    }
  }


  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full  mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold uppercase">
              File a Claim
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit} >
            <br />
            {renderAlert()}
            <div className="flex flex-wrap">
              <div className="w-full px-4">
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
              <Input Label="Description of Loss" State={description} Setter={setDescription} type="text" />
              <Input Label="Dollar Value of Loss" State={dollarValue} Setter={setDollarValue} type="Number" />
              <FileInput file={file} onChange={handleFileChange} />
            </div>

            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                {!processing ?

                  <SubmitButton Text="Submit" />
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
export default FileClaimCard

