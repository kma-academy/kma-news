import React from 'react'

export const BoxTopicItem = () => {
  return (
    <div className="boxTopicItem ">
      <div className="boxTopicItem__content">
        <div className="boxTopicItem__image picture-icon">
          <img
            src="https://scontent.fhan2-2.fna.fbcdn.net/v/t39.30808-6/201915983_1676129869265002_5982426333784267368_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=5spN1I6tb_YAX_ffUX0&_nc_ht=scontent.fhan2-2.fna&oh=00_AT-bEu6Xw4WjDZbTNhEmPBIm1qJKA4hm4VdqRgTA434A6Q&oe=61C80B50"
            alt=""
            className="boxTopicItem__img"
          />
        </div>

        <h4 className={'boxTopicItem__title'}>
          <span>
            <a href="/">Cơ sở giáo dục mầm non đủ điều kiện an toàn, trẻ em được đến trường</a>
          </span>
        </h4>
        <div className="box-exten">
          <img
            src="https://photo-baomoi.zadn.vn/c6b35edd839e6ac0338f.png"
            alt="logo bài báo"
            className="box-exten--brand"
          />
          <div className="box-exten--time">1 giờ</div>
          <div className="box-exten--involve">
            <a href="/">11 liên quân</a>
          </div>
          <a href="/" className="box-logo">
            <img
              src="https://baomoi-static.zadn.vn/favicons/favicon-32x32.png"
              alt="logo"
              className="box-logo"
            />
          </a>
        </div>
        <p className={'boxTopicItem__desc'}>
          Các cơ sở giáo dục mầm non phối hợp với cha mẹ, người chăm sóc trẻ em, y tế, chính quyền
          địa phương trong việc chuẩn bị các điều kiện bảo đảm an toàn khi đón trẻ quay trở lại
          trường.
        </p>
      </div>
    </div>
  )
}
