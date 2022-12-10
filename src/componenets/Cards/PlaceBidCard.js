import React, { useState, useEffect } from 'react'
import { baseURL, getStorage } from '../../shared/LoacalStorage'
import Alert from '../Alerts/Alert'

function PlaceBidCard() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  //Alert Handlers
  const [displayAlert, setDisplayAlert] = useState(false);
  const [processing, setProccesing] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [lastBid, setLastBid] = useState({
    amount: 0,
    message: '',
    hasLastBid: false
  })
  
  const clearForm = () => {
    setAmount('');
    setMessage('')
  }
  useEffect(() => {
    GetLastBid();
  }, []);

  const GetLastBid = async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id) {
      let token = getStorage('token')
      const response = await fetch(
        `${baseURL()}/api/Bidding/last-bid?orderId=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      const data = await response.json()
      if (data.success && data.result != null) {
        setLastBid({
          amount: data.result.amount,
          message: data.result.message,
          hasLastBid: true
        });
      }
    }
  }
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setDisplayAlert(false)
    setProccesing(true)
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
          amount: amount,
          message: message
        }),
      }
      const response = await fetch(
        `${baseURL()}/api/Bidding/offer`,
        body,
      )
      const data = await response.json()
      setDisplayAlert(true)
      setSuccess(data.success)
      if (data.success === true) {
        setAlertMessage("Bid placed successfully.")
        GetLastBid();
        clearForm();
      } else if (data.success === false) {
        setAlertMessage(data.errors[0])
      }
    } catch (e) {
      console.log(e)
    }
    setProccesing(false)
  }
  const renderAlert = () => {
    if (displayAlert) {
      return (
        <Alert message={alertMessage} success={success} />
      )
    }
  }
  const renderLastBid = () => {
    if (lastBid.hasLastBid) {
      return (
        <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-blueGray-600">
          <span className="inline-block align-middle mr-6 font-bold"> LAST BID  </span>
          <h5 className="text-lg font-normal leading-normal mt-1  mb-2">
            Amount: ${lastBid.amount}
          </h5>
          <h5 className="text-lg font-normal leading-normal mt-1  mb-2">
            Message: {lastBid.message}
          </h5>
        </div>
      )
    }
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full  mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold uppercase">
              Create Offer
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit} >
            <br />
            {renderAlert()}
            {renderLastBid()}
            <div className="flex flex-wrap">

              <Input Label="Bid Amount" State={amount} Setter={setAmount} type="number" />
              <Input Label=" Message" State={message} Setter={setMessage} type="text" />

            </div>
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                {!processing ?
                  <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-md px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Place Bid
                  </button>
                  :
                  <button className="bg-blueGray-700 text-white active:bg-lightBlue-400 font-bold uppercase text-md px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" disabled>
                    Processing...
                  </button>

                }
              </div>
            </div>
          </form>
        </div>
      </div >
    </>
  )
}
export default PlaceBidCard

function Input(props) {
  return (
    <div className="w-full px-4">
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          {props.Label}{' '}
          <span style={{ color: 'red', justifyContent: 'center' }}>
            {' '}
            *
          </span>
        </label>
        <input
          required
          name="number"
          value={props.State}
          onChange={e => props.Setter(e.target.value)}
          type={props.type}
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        />
      </div>
    </div>
  )
}
