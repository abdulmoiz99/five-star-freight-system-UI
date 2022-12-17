import React, { useState, useEffect } from 'react'
import Navbar from '../NavBar/AuthNavbar'
import Alert from '../Alerts/Alert'
import { setStorage, clearStorage, getDefaultRoute, baseURL } from '../../shared/LoacalStorage'
import IMAGE from '../../assets/img/LoginImage.PNG'
import { Input } from '../_Global/_Input'
import { LoadingButton, SubmitButton } from '../_Global/_Button'

export function Login() {
  const [emailAddress, setEmailAddress] = useState();
  const [password, setPassword] = useState();
  //Alert Handlers
  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    clearStorage()
  }, []);

  const handleSubmission = async (event) => {
    setDisplayAlert(false)
    setLoading(true)
    event.preventDefault()
    const body = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailAddress: emailAddress,
        password: password,
      }),
    }
    const response = await fetch(
      `${baseURL()}/api/Authentication/login`,
      body,
    )
    const data = await response.json()
    // when response is sucess
    if (data.success === true) {
      setStorage('token', data.result.token.code) // save value in local storage
      window.location.href = getDefaultRoute()
    } else if (data.success === false) {
      setDisplayAlert(true)
      setAlertMessage(data.errors[0])
    }
    setLoading(false)
  }
  const renderAlert = () => {
    if (displayAlert) {
      return (<Alert message={alertMessage} />)
    }
  }
  return (
    <>
      <Navbar transparent />
      <section className="relative w-full h-full py-40 min-h-screen">
        <div
          className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          style={{ backgroundImage: `url(${IMAGE})` }}
        ></div>
        <div className="container mx-auto px-5 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-5">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-lg font-bold">
                      Sign in
                    </h6>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form onSubmit={handleSubmission}>
                    {renderAlert()}
                    <Input Label="Email" State={emailAddress} Setter={setEmailAddress} type="email" />
                    <Input Label="Password" State={password} Setter={setPassword} type="password" />
                    <div className="text-center mt-6">
                      {!isLoading ? (
                        <SubmitButton Text="Sign In" />
                      ) : (
                        <LoadingButton Text="Verifying..." />

                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}