import React, { useState, useEffect } from 'react'
import { baseURL, getStorage } from '../../shared/LoacalStorage'
import Alert from '../Alerts/Alert'
import { Input } from '../_Global/_Input';
import { FH6, H6 } from '../_Global/_Heading';
import { LoadingButton, NavigationButton, SubmitButton } from '../_Global/_Button';

export function AddShipperCard() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [address, setAddress] = useState();
  const [commodity, setCommodity] = useState();
  const [taxId, setTaxId] = useState();

  const [alert, setAlert] = useState({
    display: false,
    message: '',
    success: false
  })
  const [isLoading, setLoading] = useState(false);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    CheckEdit();
  }, []);

  const CheckEdit = async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    setEdit(id ? true : false)
    if (id) {
      let token = getStorage('token')
      const response = await fetch(
        `${baseURL()}/api/Admin/shipper?shipperId=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      const data = await response.json()
      if (data.success) {
        setName(data.result.name)
        setEmail(data.result.email)
        setAddress(data.result.address)
        setCommodity(data.result.commodity)
        setTaxId(data.result.taxId)
      }
    }
  }
  const clearForm = () => {
    setName('')
    setEmail('')
    setAddress('')
    setCommodity('')
    setTaxId('')
  }
  const handleSubmission = async (event) => {
    event.preventDefault()
    const id = new URLSearchParams(window.location.search).get('id');
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
          id: id,
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          address: address,
          commodity: commodity,
          taxId: taxId
        }),
      }
      let response
      if (isEdit) {
        response = await fetch(
          `${baseURL()}/api/Admin/edit-shipper`,
          body,
        )
      }
      else {
        response = await fetch(
          `${baseURL()}/api/Admin/add-shipper`,
          body,
        )
      }
      const data = await response.json()
      if (data.success) {
        setAlert({
          ...alert,
          display: true,
          message: isEdit ? "Shipper Updated Successfully." : "Shipper created successfully.",
          success: true
        });
        if (isEdit)
          clearForm();
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
      <div className="relative flex flex-col min-w-0 break-words w-full lg:w-4/12 mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <FH6 Text={isEdit ? "Edit Shipper" : "Create New Shipper"} />
            <NavigationButton To="/Shippers" Text="View Shippers" />
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmission}>
            <br />
            {renderAlert()}
            <H6 Text=" Login Details" />
            <div className="flex flex-wrap">
              <Input Label="Email" State={email} Setter={setEmail} type="Email" />
              {!isEdit ?
                <>
                  <Input Label="Password" State={password} Setter={setPassword} type="Password" />
                  <Input Label="Confirm Password" State={confirmPassword} Setter={setConfirmPassword} type="Password" />
                </>
                : null}
            </div>
            <H6 Text=" Shipper Details" />
            <div className="flex flex-wrap">
              <Input Label="Name" State={name} Setter={setName} type="text" />
              <Input Label="Address" State={address} Setter={setAddress} type="text" />
              <Input Label="Commodity" State={commodity} Setter={setCommodity} type="text" />
              <Input Label="Tax Id" State={taxId} Setter={setTaxId} type="text" />
            </div>
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                {!isLoading ? (
                  <SubmitButton Text={isEdit ? "Update" : "Add Shipper"} />
                ) : (
                  <LoadingButton Text={isEdit ? "Updating..." : "Creating...."} />
                )}
              </div>
            </div>
          </form>
        </div>
      </div >
    </>
  )
}
