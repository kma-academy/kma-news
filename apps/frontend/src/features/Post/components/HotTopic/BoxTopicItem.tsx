import React from 'react';

export const BoxTopicItem = () => {
  return (
    <div className="boxTopicItem ">
      <div className="boxTopicItem__content">
        <div className="boxTopicItem__image picture-icon">
          <img
            src="https://static1.dienanh.net/dienanhnet/202112/3c08fde6-b13c-45e7-b852-d86a8e739a6d.jpg"
            alt=""
            className="boxTopicItem__img"
          />
        </div>

        <h4 className={'boxTopicItem__title'}>
          <span>
            <a href="/">
              Cơ sở giáo dục mầm non đủ điều kiện an toàn, trẻ em được đến
              trường
            </a>
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
          Các cơ sở giáo dục mầm non phối hợp với cha mẹ, người chăm sóc trẻ em,
          y tế, chính quyền địa phương trong việc chuẩn bị các điều kiện bảo đảm
          an toàn khi đón trẻ quay trở lại trường.
        </p>
      </div>
    </div>
  );
};
