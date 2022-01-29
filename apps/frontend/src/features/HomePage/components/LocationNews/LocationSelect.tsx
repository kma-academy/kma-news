import React, { useState } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import provinces from '@/constants/provinces'
export const LocationSelect = () => {
  const [activeSelect, setActiveSelect] = useState(false)
  return (
    <div className="location-select">
      <div className="name-select" onClick={() => setActiveSelect(!activeSelect)}>
        {provinces[0]}
        <RiArrowDropDownLine />
      </div>
      <div
        className="option-select"
        style={!activeSelect ? { display: 'none' } : { display: 'block' }}
      >
        <ul className="list-select">
          {provinces.map((province, i) => (
            <li className="item-select" key={'provinces-' + i}>
              {province}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
