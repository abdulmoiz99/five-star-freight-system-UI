import React, { useState, useEffect } from 'react'
import { baseURL, getStorage } from '../../shared/LoacalStorage';
import Alert from '../Alerts/Alert';
import { LoadingButton, SubmitButton } from '../_Global/_Button';
import { CheckFeild } from '../_Global/_Input'

export function ConfigCarrierCard() {
  const [newShipperAdded, setnewShipperAdded] = useState(false);
  const [awardedLoad, setawardedLoad] = useState(false);
  const [statusUpdateNeeded, setstatusUpdateNeeded] = useState(false);
  const [newRFP, setnewRFP] = useState(false);

  const [alert, setAlert] = useState({
    display: false,
    message: '',
    success: false
  })
  const [isLoading, setLoading] = useState(false);
  const [isProcessing, setProccesing] = useState(false);


  useEffect(() => {
    GetConfigSetting();
    // we should figure this issue out later, issue can be recreated by removing the below comment
    // eslint-disable-next-line
  }, []);

  const GetConfigSetting = async () => {
    setProccesing(true)
    let token = getStorage('token')
    const response = await fetch(
      `${baseURL()}/api/Carrier/configurations`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const data = await response.json()
    if (data.success && data.result != null) {
      setnewShipperAdded(data.result.newShipperAdded)
      setawardedLoad(data.result.awardedLoad)
      setstatusUpdateNeeded(data.result.statusUpdateNeeded)
      setnewRFP(data.result.newRFP)
    }
    else {
      setAlert({
        ...alert,
        display: true,
        message: data.errors[0],
        success: false
      });
    }
    setProccesing(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
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
          "newShipperAdded": newShipperAdded,
          "awardedLoad": awardedLoad,
          "statusUpdateNeeded": statusUpdateNeeded,
          "newRFP": newRFP
        }),
      }
      const response = await fetch(
        `${baseURL()}/api/Carrier/set-configurations`,
        body,
      )
      const data = await response.json()
      if (data.success) {
        setAlert({
          ...alert,
          display: true,
          message: "Notification settings updated successfully.",
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
  const renderAlert = () => {
    if (alert.display) {
      return (<Alert message={alert.message} success={alert.success} />)
    }
  }

  return (
    <>
      <div className="mt-5 sm:mt-0 pl-5">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-2 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded">
                <div className="bg-white px-4 py-5 sm:p-6">
                  {renderAlert()}
                  <fieldset>
                    <h1 className="text-blueGray-600 text-lg  mb-6 font-semibold uppercase font-semibold pl-10">
                      By Email
                    </h1>
                    {!isProcessing ?
                      <div className="mt-4 p-10 pl-10">
                        <CheckFeild Label="New shipper added " Description="Get notified when a new shipper is added to the network."
                          state={newShipperAdded} setter={setnewShipperAdded}
                        />
                        <CheckFeild Label="Awarded load" Description="Get notified when a shipment is awarded."
                          state={awardedLoad} setter={setawardedLoad}
                        />
                        <CheckFeild Label="Status update needed " Description="Get notified when a status update is required for the shipment."
                          state={statusUpdateNeeded} setter={setstatusUpdateNeeded}
                        />
                        <CheckFeild Label="New RFP" Description="Get notified when a new RFP is uploaded."
                          state={newRFP} setter={setnewRFP}
                        />
                      </div>
                      : null}
                  </fieldset>
                </div>
                <div className="bg-blueGray-50 px-4 py-3 text-right sm:px-6">
                  {!isLoading ? (
                    <SubmitButton Text="Update" />
                  ) : (
                    <LoadingButton Text="Updating" />
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

