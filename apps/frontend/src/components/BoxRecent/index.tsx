import React from 'react'
import './index.css'
const BoxRecent = () => {
  return (
    <div className="box-recent">
      <div className="box-recent__frame-img">
        <a href="/#">
          <img
            src="https://i.ytimg.com/vi/sYDmUyCj9JY/maxresdefault.jpg"
            alt=""
            className="box-recent__img"
          />
        </a>
      </div>
      <div className="box-recent__content">
        <div className="box-recent__title">
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
          <div className="box-exten__remove">
            <div className="box-exten__remove-x">x</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BoxRecent
