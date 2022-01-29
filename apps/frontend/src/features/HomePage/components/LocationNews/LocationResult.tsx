import React from 'react'
import { Link } from 'react-router-dom'

export const LocationResult: React.FC = () => {
  return (
    <div className="location-result">
      <div className="list-news-right">
        <div className="item-news-navbar">
          <div className="img-news-navbar">
            <Link to="/">
              <img
                src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg"
                alt=""
              />
            </Link>
          </div>
          <div className="description-item-news">
            <Link to="/">
              <span>Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ</span>
            </Link>
            <div className="news-source">
              <Link to="/">
                <img
                  className="logo-source"
                  src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
                  alt=""
                />
              </Link>
              <span className="news-time">2 giờ</span>
              <span className="number-news-other">
                <Link to="/">60 liên quan</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <a href="/">Xem thêm</a>
    </div>
  )
}
