import React from 'react'
import './index.css'
interface Props {}

const BoxVideo: React.FC<Props> = (props) => {
  return (
    <div className="boxVideo">
      <div className="boxVideo-photo video-icon">
        <img
          src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_19_30_41248238/bb2a1e69ad2b44751d3a.jpg"
          alt="Park-sensei"
        />
      </div>
      <div className="boxVideo-title">
        Gặp kình địch ở bán kết, HLV Park Hang-seo bất ngờ kêu một việc khó
      </div>
      <div className="box-exten">
        <img
          src="https://photo-baomoi.zadn.vn/c6b35edd839e6ac0338f.png"
          alt="logo bài báo"
          className="box-exten--brand"
        />
        <div className="box-exten--time">1 giờ</div>
        <div className="box-exten--involve">11 liên quân</div>
        <img
          src="https://baomoi-static.zadn.vn/favicons/favicon-32x32.png"
          alt="logo"
          className="box-logo"
        />
      </div>
    </div>
  )
}
export default BoxVideo
