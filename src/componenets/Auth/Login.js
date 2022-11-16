import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../NavBar/AuthNavbar'
import Alert from '../Alerts/Alert'
import { setStorage, clearStorage } from '../../shared/LoacalStorage'
import IMAGE from '../../assets/img/LoginImage.PNG'

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { emailAddress: '', password: '' }
    this.state = { displayAlert: false, AlertMessage: '', isLoading: true }
    clearStorage()
  }
  componentDidMount() {
    this.setState({ isLoading: false })
  }
  handleSubmission = async (event) => {
    this.setState({ displayAlert: false, isLoading: true })
    const { emailAddress, password } = this.state
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
      'https://fivestartlogisticsapi.azurewebsites.net/api/Authentication/login-shipper',
      body,
    )
    const data = await response.json()
    // when response is sucess
    if (data.success === true) {
      setStorage('token', data.result.token.code) // save value in local storage
      window.location.href = '/CreateShipment'
    } else if (data.success === false) {
      this.setState({ displayAlert: true, AlertMessage: data.errors[0] })
    }
    this.setState({ isLoading: false })

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
          <Alert message={this.state.AlertMessage} />
        </>
      )
    }
  }

  render() {
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
                    <form onSubmit={this.handleSubmission}>
                      {this.renderAlert()}
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          required
                          type="email"
                          name="emailAddress"
                          value={this.state.emailAddress}
                          onChange={this.handleChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Email"
                          autoComplete="on"
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          required
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                          autoComplete="on"
                        />
                      </div>
                      <div className="text-center mt-6">
                        {!this.state.isLoading ? (
                          <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit"
                          >
                            Sign In
                          </button>
                        ) : (
                          <button
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            disabled
                          >
                            Verifying...
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2">
                    <Link to="/auth/forgotPassword" className="text-blueGray-200">
                      <small>Forgot password?</small>
                    </Link>
                  </div>
                  <div className="w-1/2 text-right">
                    <Link to="/auth/register" className="text-blueGray-200">
                      <strong>Create new account</strong>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}
