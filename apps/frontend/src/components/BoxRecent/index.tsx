import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './index.css';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { defaultThumbnail } from '@/constants/thumnail';
export interface BoxRecentProps {
  title: string;
  url: string;
  thumbnailURL: string;
  visitDate: string;
  onDelete: () => void;
}
const BoxRecent: React.FC<BoxRecentProps> = ({
  url,
  thumbnailURL,
  title,
  visitDate,
  onDelete,
}) => {
  return (
    <div className="box-recent">
      <div className="box-recent__frame-img">
        <Link to={url}>
          <img
            src={thumbnailURL || defaultThumbnail}
            alt={title}
            className="box-recent__img"
          />
        </Link>
      </div>
      <div className="box-recent__content">
        <div className="box-recent__title">
          <Link to={url}>{title}</Link>
        </div>
        <div className="box-exten">
          <img
            src="https://photo-baomoi.zadn.vn/c6b35edd839e6ac0338f.png"
            alt="logo bài báo"
            className="box-exten--brand"
          />
          <div className="box-exten--time">
            {moment(visitDate, moment.ISO_8601, 'vn').fromNow()}
          </div>
          <div className="box-exten--involve">
            <a href="/#">11 liên quan</a>
          </div>
          <a href="/#" className="">
            <img
              src="https://baomoi-static.zadn.vn/favicons/favicon-32x32.png"
              alt="logo"
              className="box-logo"
            />
          </a>
          <div className="box-exten__remove">
            <div className="box-exten__remove-x" onClick={onDelete}>
              x
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoxRecent;
