// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { defaultThumbnail } from '@/constants/thumnail';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
interface BoxNewProps {
  thumbnailURL?: string;
  url: string;
  description?: string;
  publishedAt: string;
}

const BoxNews: React.FC<BoxNewProps> = ({
  thumbnailURL,
  url,
  description,
  publishedAt,
}) => {
  return (
    <div className="boxNews">
      <div className="boxNews-photo video-icon">
        <img
          className="news-photo "
          src={thumbnailURL || defaultThumbnail}
          alt="Park-sensei"
        />
      </div>
      <div className="boxNews-left">
        <Link to={url}>
          <div className="boxNews-title">{description}</div>
        </Link>
        <div className="box-exten">
          <img
            src="https://photo-baomoi.zadn.vn/c6b35edd839e6ac0338f.png"
            alt="logo bài báo"
            className="box-exten--brand"
          />
          <div className="box-exten--time">
            {moment(publishedAt).locale('vi').fromNow()}
          </div>
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
