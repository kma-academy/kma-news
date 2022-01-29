import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const BoxFollow = () => {
  return (
    <div className="box-follow">
      <div className="box-follow__logo">
        <Link to="">
          <img
            src="https://photo-baomoi.zadn.vn/6d8571b593f67aa823e7.png"
            alt=""
            className="box-follow__logo-m"
          />
        </Link>
      </div>
      <Link to="" className="box-follow__name">
        <div className="box-follow__name">Zing</div>
      </Link>
      <div className="box-follow__remove">X</div>
    </div>
  )
}
export default BoxFollow
