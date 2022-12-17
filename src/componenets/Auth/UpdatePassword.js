import React, { useState } from 'react'
import { baseURL, getStorage } from '../../shared/LoacalStorage'
import Alert from '../Alerts/Alert'
import { FH6 } from '../_Global/_Heading';
import { Input } from '../_Global/_Input';

import { LoadingButton, SubmitButton } from '../_Global/_Button';

export function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [alert, setAlert] = useState({
    display: false,
    message: '',
    success: false,
  })
  const [isLoading, setLoading] = useState(false);


  const clearForm = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }
  const handleSubmission = async (event) => {
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
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }),
      }
      const response = await fetch(
        `${baseURL()}/api/Authentication/update-password`,
        body,
      )
      const data = await response.json()
      if (data.success) {
        setAlert({ ...alert, display: true, message: "Password Updated Successfully.", success: true });
        clearForm();
      }
      else {
        setAlert({ ...alert, display: true, message: data.errors[0], success: false });

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
      <div className="relative flex flex-col min-w-0 break-words w-full lg:w-8/12 mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <FH6 Text="Update Password" />
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmission}>
            <br />
            {renderAlert()}
            <div className="flex flex-wrap">
              <Input Label="Current Password" State={currentPassword} Setter={setCurrentPassword} type="password" />
              <Input Label="New  Password" State={newPassword} Setter={setNewPassword} type="password" />
              <Input Label="Confirm New Password" State={confirmPassword} Setter={setConfirmPassword} type="password" />
            </div>
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                {!isLoading ?
                  <SubmitButton Text="Update" />
                  :
                  <LoadingButton Text="Updating..." />
                }
              </div>
            </div>
          </form>
        </div>
      </div >
    </>
  )
}
