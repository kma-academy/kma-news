import React from 'react'
import { FiMapPin } from 'react-icons/fi'
import { LocationResult } from './LocationResult'
import { LocationSelect } from './LocationSelect'

export const LocationNews = () => {
  return (
    <div className="section">
      <div className="location">
        <div className="location-head">
          <FiMapPin />
          <h3>ĐỊA PHƯƠNG</h3>
        </div>
        <LocationSelect />
        <LocationResult />
      </div>
    </div>
  )
}
