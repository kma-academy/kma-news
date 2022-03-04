import React from 'react';
import './index.css';
export interface BoxTopicHeaderProps {
  big: boolean;
}
export const BoxTopicHeader: React.FC<BoxTopicHeaderProps> = (props) => {
  const { big } = props;
  return (
    <div
      className={big ? 'boxTopicHeader boxTopicHeader--big' : 'boxTopicHeader'}
    >
      <div className="boxTopicHeader__content">
        <img src="" alt="" className="boxTopicHeader__img" />

        <h4
          className={
            big ? 'boxTopicHeader__title--big' : 'boxTopicHeader__title'
          }
        >
          <span>
            <a href="/#">
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
            <a href="/#">11 liên quân</a>
          </div>
          <a href="/#" className="box-logo">
            {/* <img
              src="https://baomoi-static.zadn.vn/favicons/favicon-32x32.png"
              alt="logo"
              className="box-logo"
            /> */}
            <i className="bm_W"></i>
          </a>
        </div>
        <p className={big ? 'boxTopicHeader__desc' : 'hide'}>
          Các cơ sở giáo dục mầm non phối hợp với cha mẹ, người chăm sóc trẻ em,
          y tế, chính quyền địa phương trong việc chuẩn bị các điều kiện bảo đảm
          an toàn khi đón trẻ quay trở lại trường.
        </p>
      </div>
    </div>
  );
};
