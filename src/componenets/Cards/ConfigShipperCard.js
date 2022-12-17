import React, { useState, useEffect } from 'react'
import { baseURL, getStorage } from '../../shared/LoacalStorage';
import Alert from '../Alerts/Alert';
import { LoadingButton, SubmitButton } from '../_Global/_Button';
import { CheckFeild } from '../_Global/_Input'

export function ConfigShipperCard() {
  const [loadStatusUpdate, setloadStatusUpdate] = useState(false);
  const [carrierTenderApproved, setcarrierTenderApproved] = useState(false);
  const [carrierOnBoarded, setcarrierOnBoarded] = useState(false);
  const [podRequests, setpodRequests] = useState(false);
  const [insuranceMonitoring, setinsuranceMonitoring] = useState(false);
  const [carrierCompliance, setcarrierCompliance] = useState(false);
  const [newBid, setnewBid] = useState(false);
  const [tenderExpired, settenderExpired] = useState(false);

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
      `${baseURL()}/api/Shipper/configurations`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const data = await response.json()
    if (data.success && data.result != null) {
      setloadStatusUpdate(data.result.loadStatusUpdate)
      setcarrierTenderApproved(data.result.carrierTenderApproved)
      setcarrierOnBoarded(data.result.carrierOnBoarded)
      setpodRequests(data.result.podRequests)
      setinsuranceMonitoring(data.result.insuranceMonitoring)
      setcarrierCompliance(data.result.carrierCompliance)
      setnewBid(data.result.newBid)
      settenderExpired(data.result.tenderExpired)
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
          "loadStatusUpdate": loadStatusUpdate,
          "carrierTenderApproved": carrierTenderApproved,
          "carrierOnBoarded": carrierOnBoarded,
          "podRequests": podRequests,
          "insuranceMonitoring": insuranceMonitoring,
          "carrierCompliance": carrierCompliance,
          "newBid": newBid,
          "tenderExpired": tenderExpired
        }),
      }
      const response = await fetch(
        `${baseURL()}/api/Shipper/set-configurations`,
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
                        <CheckFeild Label="LOAD STATUS UPDATE" Description="Get notified about the current status or progress of a load or transfer process."
                          state={loadStatusUpdate} setter={setloadStatusUpdate}
                        />
                        <CheckFeild Label="CARRIER TENDER APPROVED OR DENIED" Description="Get notified when a carrier's tender has been approved or denied by the shipper."
                          state={carrierTenderApproved} setter={setcarrierTenderApproved}
                        />
                        <CheckFeild Label="CARRIER ON BOARDED" Description="Get notified when a carrier has been added to a shipper's list of approved carriers and is now available to be selected for load tenders. "
                          state={carrierOnBoarded} setter={setcarrierOnBoarded}
                        />
                        <CheckFeild Label="POD Requests" Description="Get notified when a POD request is sent to the carrier."
                          state={podRequests} setter={setpodRequests}
                        />
                        <CheckFeild Label="Insurance Monitoring" Description="Get notified when status of insurance coverage for a shipment is updated."
                          state={insuranceMonitoring} setter={setinsuranceMonitoring}
                        />
                        <CheckFeild Label="Carrier Compliance" Description="Get notified whencarrier compliance is successfull."
                          state={carrierCompliance} setter={setcarrierCompliance}
                        />
                        <CheckFeild Label="New bid " Description="Get notified when a new bid is placed on the shipment."
                          state={newBid} setter={setnewBid}
                        />
                        <CheckFeild Label="Tender Expired" Description="Get notified when tender expired."
                          state={tenderExpired} setter={settenderExpired}
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