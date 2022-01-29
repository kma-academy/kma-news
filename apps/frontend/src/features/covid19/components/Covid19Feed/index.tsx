import React, { useEffect, useState } from 'react'
import { BsFlagFill } from 'react-icons/bs'
import { FaUserInjured, FaUsersSlash } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchCovid19Data, selectData } from '@/features/covid19/covid19Slice'

const numberFormat = new Intl.NumberFormat('en-EN')
export const Covid19Feed = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectData)
  const [showFull, setShowFull] = useState(false)
  useEffect(() => {
    dispatch(fetchCovid19Data())
    return () => {}
  }, [dispatch])
  return (
    <div className="section">
      <div className="news-covid">
        <div className="time-news-covid">Cập nhật: 14/12/2021 - 18:21</div>
        <div className="figure-covid">
          <table>
            <thead>
              <tr>
                <th>
                  <BsFlagFill color="#ff5a5a" size="28px" />
                </th>
                <th>
                  <FaUserInjured color="#ff5a5a" size="28px" />
                </th>
                <th>
                  <FaUsersSlash color="#ff5a5a" size="28px" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd">
                <td>Thế giới</td>
                <td>{numberFormat.format(data?.world.cases || 0)}</td>
                <td>{numberFormat.format(data?.world.death || 0)}</td>
              </tr>
              <tr>
                <td>Trong nước</td>
                <td>{numberFormat.format(data?.internal.cases || 0)}</td>
                <td>{numberFormat.format(data?.internal.death || 0)}</td>
              </tr>
              {data?.locations.slice(0, showFull ? undefined : 10).map((e,index) => (
                <tr key={index}>
                  <td>{e.name}</td>
                  <td>{numberFormat.format(e.cases || 0)}</td>
                  <td>{numberFormat.format(e.death || 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault()
              setShowFull(!showFull)
            }}
          >
            {showFull ? 'ẨN BỚT' : 'XEM THÊM'}
          </a>
        </div>
      </div>
    </div>
  )
}
