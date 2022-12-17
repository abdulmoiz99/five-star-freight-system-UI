import React, { useState } from 'react'
import { baseURL, getStorage } from '../../shared/LoacalStorage'
import Alert from '../Alerts/Alert'
import { LoadingButton, SubmitButton } from '../_Global/_Button';
import { Input } from '../_Global/_Input';
import { driverStatus } from '../../shared/DropDownCache';
import Select from 'react-select'

function UpdateDriverStatusCard() {
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [processing, setProccesing] = useState(false);

  const [alert, setAlert] = useState({
    display: false,
    message: '',
    success: false
  })

  const clearForm = () => {
    setNotes('');
    setStatus('')
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setProccesing(true)
    setAlert({ ...alert, display: false });
    let token = getStorage('token')
    const id = new URLSearchParams(window.location.search).get('id');
    try {
      const body = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: id,
          status: status,
          notes: notes
        }),
      }
      const response = await fetch(
        `${baseURL()}/api/shipment/update-driver-status`,
        body,
      )
      const data = await response.json()
      if (data.success === true) {
        setAlert({
          ...alert,
          display: true,
          message: "Status Updated Successfully",
          success: true
        });
        clearForm();
      } else if (data.success === false) {
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
    setProccesing(false)
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
      <div className="relative flex flex-col min-w-0 break-words w-full  mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold uppercase">
              Driver Status
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
                    Status
                    <span style={{ color: 'red', justifyContent: 'center' }}> {' '} *</span>
                  </label>
                  <Select
                    options={driverStatus}
                    value={{ value: status, label: status }}
                    onChange={(selectedOption) => {
                      setStatus(selectedOption.value)
                    }}
                  />
                </div>
              </div>
              {/* <Select Label = "Status" List= {driverStatus}  State={status} Setter={setStatus}/> */}
              <Input Label="Notes" State={notes} Setter={setNotes} type="text" />

            </div>
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                {!processing ?

                  <SubmitButton Text=" Update Status" />
                  :
                  <LoadingButton Text=" Updating....." />
                }
              </div>
            </div>
          </form>
        </div>
      </div >
    </>
  )
}
export default UpdateDriverStatusCard

