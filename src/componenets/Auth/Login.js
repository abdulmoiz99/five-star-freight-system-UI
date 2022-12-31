import React, { useState, useEffect } from 'react'
import Alert from '../Alerts/Alert'
import { setStorage, clearStorage, getDefaultRoute, baseURL } from '../../shared/LoacalStorage'
import IMAGE from '../../assets/img/LoginImage.PNG'
import LOGO from '../../assets/img/FiveTMSLogo.PNG'

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
      <section className="bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply bg-opacity-60" style={{ backgroundImage: `url(${IMAGE})` }}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen pt:mt-0">
          <h1 className="flex items-center mb-6 text-2xl font-semibold text-white">
            <img className="w-8 h-8 mr-2" src={LOGO} alt="logo" />
            FIVE TMS Ai
          </h1>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
            <div className="p-6 space-y-4 md:space-y-6 lg:space-y-8 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmission} >
                {renderAlert()}
                <Input Label="Email" Type="email" Placeholder="name@company.com" State={emailAddress} Setter={setEmailAddress} />
                <Input Label="Password" Type="password" Placeholder="••••••••" tate={password} Setter={setPassword} />
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <h1 className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</h1>
                </div>
                {!isLoading ?
                  <SubmitButton Label="Log in to your account" />
                  :
                  <LoadingButton Label="Verifying" />
                }
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
const Input = ({ Label, Type, Placeholder, State, Setter }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{Label}</label>
      <input
        type={Type}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder={Placeholder}
        required
        value={State}
        onChange={e => Setter(e.target.value)}
      />
    </div>
  )
}
const SubmitButton = ({ Label }) => {
  return (
    <button type="submit"
      className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
    >
      {Label}
    </button>
  )
}
export function LoadingButton({ Label }) {
  return (
    <button className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center uppercase"
      disabled
    >
      <div className="flex justify-center">
        <svg className="loading pr-15" width="25" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="0.1" fill="none" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
        </svg>
        <span className="pl-2">{Label}</span>
      </div>
    </button>
  )
}