import { defaultThumbnail } from '@/constants/thumnail';
import { PostResponse } from '@kma-news/api-interface';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
interface BoxNewProps {
  data: PostResponse;
}

const BoxNews: React.FC<BoxNewProps> = ({ data }) => {
  return (
    <div className="boxNews">
      <div className="boxNews-photo video-icon">
        <img
          className="news-photo "
          src={data.thumbnailURL || defaultThumbnail}
          alt="Park-sensei"
        />
      </div>
      <div className="boxNews-left">
        <Link to={`/bai-bao/${data.slug}/${data.id}`}>
          <div className="boxNews-title">{data.description}</div>
        </Link>
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
    </div>
  );
};
export default BoxNews;
