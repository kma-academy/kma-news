import React from 'react'
import './index.css'
interface BoxHeaderProps {}

const BoxHot: React.FC<BoxHeaderProps> = (props) => {
  return (
    <div className="boxHot">
      <div className="boxHot-photo picture-icon">
        <img
          className="hot-photo"
          src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_19_30_41248238/bb2a1e69ad2b44751d3a.jpg"
          alt="Park-sensei"
        />
      </div>
      <div className="boxHot-left">
        <div className="boxHot-title">
          Gặp kình địch ở bán kết, HLV Park Hang-seo bất ngờ kêu một việc khó.Gặp kình địch ở bán
          kết, HLV Park Hang-seo bất ngờ kêu một việc khó
        </div>
        <div className="boxHot-exten">
          <img
            src="https://photo-baomoi.zadn.vn/c6b35edd839e6ac0338f.png"
            alt="logo bài báo"
            className="box-exten--brand"
          />
          <div className="boxHot-exten--time">1 giờ</div>
          <div className="boxHot-exten--involve">11 liên quân</div>
          <img
            src="https://baomoi-static.zadn.vn/favicons/favicon-32x32.png"
            alt="logo"
            className="boxHot-logo"
          />
        </div>
      </div>
    </div>
  )
}
export default BoxHot
