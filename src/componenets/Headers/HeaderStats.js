import React from 'react'

// components

import CardStats from '../Cards/CardStats'

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-5/12 px-4">
                <CardStats
                  statSubtitle="Real time grid based carbon footprint"
                  statTitle="340"
                  statArrow="up"
                  statPercent=""
                  statPercentColor=""
                  statDescripiron=""
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-5/12 px-4">
                <CardStats
                  statSubtitle=" BEIS carbon footprin"
                  statTitle="299"
                  statArrow=""
                  statPercent=""
                  statPercentColor=""
                  statDescripiron=""
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
