import React from 'react'
import './index.css'
const BoxOffer = () => {
  return (
    <div className="box-offer">
      <div className="box-offer__frame-img">
        <a href="/#">
          <img
            src="https://i.ytimg.com/vi/sYDmUyCj9JY/maxresdefault.jpg"
            alt=""
            className="box-offer__img"
          />
        </a>
      </div>
      <div className="box-offer__content">
        <div className="box-offer__title">
          <a href="/#">Lào Cai: Tạm giữ hàng nghìn bao thuốc lá ngoại âsasas lậu</a>
        </div>
        <div className="box-exten">
          <img
            src="https://photo-baomoi.zadn.vn/c6b35edd839e6ac0338f.png"
            alt="logo bài báo"
            className="box-exten--brand"
          />
          <div className="box-exten--time">1 giờ</div>
          <div className="box-exten--involve">
            <a href="/#">11 liên quân</a>
          </div>
          <a href="/#" className="">
            <img
              src="https://baomoi-static.zadn.vn/favicons/favicon-32x32.png"
              alt="logo"
              className="box-logo"
            />
          </a>
        </div>
      </div>
    </div>
  )
}
export default BoxOffer
