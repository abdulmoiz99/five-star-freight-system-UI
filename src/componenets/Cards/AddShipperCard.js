import React from 'react'
import { baseURL, getStorage } from '../../shared/LoacalStorage'
import Alert from '../Alerts/Alert'
import { Link } from 'react-router-dom'

export class AddShipperCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayAlert: false,
      success: true,
      AlertMessage: '',
      GeneratingReport: true,
      isEdit: false
    }
    this.state = {
      Name: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
      Address: '',
      Commodity: '',
      TaxId: ''
    }
  }
  componentDidMount() {
    this.setState({ GeneratingReport: false })
    this.CheckEdit();
  }
  CheckEdit = async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    this.setState({ isEdit: id ? true : false })
    if (id) {
      let token = getStorage('token')
      const response = await fetch(
        `${baseURL()}/api/Admin/shipper?shipperId=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      const data = await response.json()
      this.setState({
        Name: data.result.name,
        Email: data.result.email,
        Address: data.result.address,
        Commodity: data.result.commodity,
        TaxId: data.result.taxId,
      })
    }
  }
  clearForm = () => {
    this.setState({
      Name: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
      Address: '',
      Commodity: '',
      TaxId: ''
    })
  }
  handleSubmission = async (event) => {
    event.preventDefault()
    const id = new URLSearchParams(window.location.search).get('id');
    this.setState({ displayAlert: false, GeneratingReport: true })
    const {
      Name,
      Email,
      Password,
      ConfirmPassword,
      Address,
      Commodity,
      TaxId,
      isEdit
    } = this.state
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
          name: Name,
          email: Email,
          password: Password,
          confirmPassword: ConfirmPassword,
          address: Address,
          commodity: Commodity,
          taxId: TaxId
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
      let message = isEdit ? "Shipper Updated Successfully." : "Shipper created successfully.";
      if (data.success === true) {
        this.setState({ displayAlert: true, AlertMessage: message, success: true, })
        if (!this.state.isEdit)
          this.clearForm();
      } else if (data.success === false) {
        this.setState({ displayAlert: true, AlertMessage: data.errors[0], success: false, })
      }
    } catch (e) {
      console.log(e)
    }
    this.setState({ GeneratingReport: false })
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  renderAlert = () => {
    if (this.state.displayAlert) {
      return (
        <>
          <Alert message={this.state.AlertMessage} success={this.state.success} />
        </>
      )
    }
  }
  render() {
    return (
      <>
        <div className="relative flex flex-col min-w-0 break-words w-full lg:w-4/12 mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold uppercase">
                {this.state.isEdit ? "Edit Shipper" : "Create New Shipper"}
              </h6>
              <Link
                to="/Shippers"
                className="bg-emerald-500 text-white active:bg-emerald-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              >
                View Shippers
              </Link>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={this.handleSubmission}>
              <br />
              {this.renderAlert()}
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Login Details
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email{' '}
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="Email"
                      value={this.state.Email}
                      onChange={this.handleChange}
                      type="Email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                {!this.state.isEdit ?
                  <>
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Passwrd{' '}
                          <span style={{ color: 'red', justifyContent: 'center' }}>
                            {' '}
                            *
                          </span>
                        </label>
                        <input
                          required={!this.state.isEdit}
                          autoComplete="new-password"
                          name="Password"
                          value={this.state.Password}
                          onChange={this.handleChange}
                          type="Password"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Confirm Password{' '}
                          <span style={{ color: 'red', justifyContent: 'center' }}>
                            {' '}
                            *
                          </span>
                        </label>
                        <input
                          required={!this.state.isEdit}
                          name="ConfirmPassword"
                          value={this.state.ConfirmPassword}
                          onChange={this.handleChange}
                          type="Password"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                  </>
                  : null}
              </div>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Shipper Details
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="Name"
                      value={this.state.Name}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Address
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="Address"
                      value={this.state.Address}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Commodity
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="Commodity"
                      value={this.state.Commodity}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      TaxId
                      <span style={{ color: 'red', justifyContent: 'center' }}>
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      required
                      name="TaxId"
                      value={this.state.TaxId}
                      onChange={this.handleChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  {!this.state.GeneratingReport ? (
                    <>
                      <button
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-md px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        {this.state.isEdit ? "Update" : "Add Shipper"}
                      </button>
                    </>
                  ) : (
                    <button className="bg-blueGray-700 text-white active:bg-lightBlue-400 font-bold uppercase text-md px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" disabled>
                       {this.state.isEdit ? "Updating..." : "Creating...."}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div >
      </>
    )
  }
}
