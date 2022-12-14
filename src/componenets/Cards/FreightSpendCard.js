import React, { useEffect, useState } from 'react'
import { baseURL, getStorage } from '../../shared/LoacalStorage';
import CardStats from '../_Global/_CardStats'


export default function FreightSpendCard() {
  const numberWithCommas = (x) => {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  const [freight, setFreight] = useState({
    total: null,
    year: null,
    month: null,
    week: null,
  })
  useEffect(() => {
    GetFreights();
  }, []);

  const GetFreights = async () => {
    let token = getStorage('token')
    const response = await fetch(
      `${baseURL()}/api/Shipper/freight-spent`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const data = await response.json()
    if (data.success && data.result != null) {
      setFreight({
        total: data.result.totalFrieght,
        year: data.result.totalFreightInYear,
        month: data.result.totalFreightInMonth,
        week: data.result.totalFreightInWeek,
      });
    }
  }
  return (
    <>
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-3/12 xl:w-5/12 px-4">
                <CardStats
                  statSubtitle="Total Spendings"
                  statTitle={numberWithCommas(freight.total?.amount)}
                  statDescripiron={freight.total?.label}
                  statIconColor="bg-blueGray-600"
                />
              </div>
              <div className="w-full lg:w-3/12 xl:w-5/12 px-4">
                <CardStats
                  statSubtitle="Current Year"
                  statTitle={numberWithCommas(freight.year?.amount)}
                  statDescripiron={freight.year?.label}
                  statIconColor="bg-blueGray-600"
                />
              </div>
              <div className="w-full lg:w-3/12 xl:w-5/12 px-4 ">
                <CardStats
                  statSubtitle="Current Month"
                  statTitle={numberWithCommas(freight.month?.amount)}
                  statDescripiron={freight.month?.label}
                  statIconColor="bg-blueGray-600"
                />
              </div>
              <div className="w-full lg:w-3/12 xl:w-5/12 px-4">
                <CardStats
                  statSubtitle="Current Week"
                  statTitle={numberWithCommas(freight.week?.amount)}
                  statDescripiron={freight.week?.label}
                  statIconColor="bg-blueGray-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
