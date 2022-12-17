import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Logo from '../Svg/Logo'

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  const navigate = useNavigate()
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="align-middle leading-relaxed inline-block">
              <Logo />
            </div>
            <Link
              to="/"
              className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>

          <div
            className={
              'lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none' +
              (navbarOpen ? ' block' : ' hidden')
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <a
                  className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                  href="#Top"
                >
                  <i className="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{' '}
                  Map
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                  href="#RegionalExample"
                >
                  <i className="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{' '}
                  Regional Examples
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                  href="#About"
                >
                  <i className="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{' '}
                  About
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                  href="#FAQ"
                >
                  <i className="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{' '}
                  FAQ
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                  href="/ContactUs"
                >
                  <i className="hover:text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{' '}
                  Contact us
                </a>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => navigate('/Auth')}
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Sign In
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
