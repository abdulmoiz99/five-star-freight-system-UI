import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const Alert = (props) => {
  const [showAlert, setShowAlert] = React.useState(true)
  return (
    <>
      {showAlert ? (
        <div
          // className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500"

          className={
            props.success
              ? 'text-white px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500'
              : 'text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500'
          }
        >
          <span className="text-xl inline-block mr-4 align-middle">
            <FontAwesomeIcon icon={faBell} />
          </span>
          <span className="inline-block align-middle mr-6">
            {props.message}
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-4 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×{'   '} </span>
          </button>
        </div>
      ) : null}
    </>
  )
}

export default Alert
