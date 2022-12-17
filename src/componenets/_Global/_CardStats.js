import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faDollar } from '@fortawesome/free-solid-svg-icons'

export default function CardStats({
  statSubtitle,
  statTitle,
  statDescripiron,
  statIconColor,
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-lg">
                {statSubtitle}
              </h5>
              <h4 className="text-xl font-semibold leading-normal mt-0 mb-2 text-lightBlue-800">
                <FontAwesomeIcon icon={faDollar} />
                {statTitle}
              </h4>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  'text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ' +
                  statIconColor
                }
              >
                <FontAwesomeIcon icon={faCalendarDays} />
              </div>
            </div>
          </div>
          <p className="text-sm text-blueGray-500 mt-4">
            <span className="whitespace-nowrap">{statDescripiron}</span>
          </p>
        </div>
      </div>
    </>
  )
}