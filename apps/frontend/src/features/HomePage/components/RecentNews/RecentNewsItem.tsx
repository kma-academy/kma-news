/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { defaultThumbnail } from '@/constants/thumnail';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

export interface RecentNewsItemProps {
  url: string;
  title: string;
  publishedAt: Date;
  thumbnailURL: string;
  publisherLogo?: string;
  publisherName?: string;
}

export const RecentNewsItem: React.FC<RecentNewsItemProps> = (props) => {
  const {
    url,
    thumbnailURL,
    title,
    publishedAt,
    publisherLogo,
    publisherName,
  } = props;
  return (
    <div className="col-4 item-news">
      <div className="img-item-news">
        <Link to={url}>
          <img src={thumbnailURL || defaultThumbnail} alt={title} />
        </Link>
      </div>

      <div className="description-item-news">
        <Link to={url}>
          <span>{title}</span>
        </Link>
        <div className="news-source">
          <Link to={url}>
            <img
              className="logo-source"
              src={
                publisherLogo ||
                'https://photo-baomoi.zadn.vn/6eede58338c0d19e88d1.png'
              }
              alt={publisherName || 'Báo mới'}
            />
          </Link>
          <span className="news-time">
            {moment(publishedAt).locale('vi').fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};
