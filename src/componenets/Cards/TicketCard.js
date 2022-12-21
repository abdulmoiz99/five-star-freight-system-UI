import React, { useState } from 'react'
import Alert from '../Alerts/Alert'
import { LoadingButton, SubmitButton } from '../_Global/_Button';
import { FileInput, Input } from '../_Global/_Input';
import { FH6 } from '../_Global/_Heading';

function TicketCard() {
  const [dollarValue, setDollarValue] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  const [processing, setProccesing] = useState(false);

  const [alert, setAlert] = useState({
    display: false,
    message: '',
    success: false
  })
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
            <FH6 Text="Open Ticket" />
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit} >
            <br />
            {renderAlert()}
            <div className="flex flex-wrap">
              <Input Label="Type" State={description} Setter={setDescription} type="text" />
              <Input Label="Description" State={dollarValue} Setter={setDollarValue} type="Number" />
              <FileInput file={file} onChange={handleFileChange} Description="PNG, JPG, GIF up to 10MB" />
            </div>

            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                {!processing ?
                  <SubmitButton Text="Submit" /> :
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
export default TicketCard

