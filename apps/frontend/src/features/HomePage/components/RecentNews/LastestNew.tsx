/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { defaultThumbnail } from '@/constants/thumnail';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

export interface LastestNewProps {
  url: string;
  title: string;
  publishedAt: Date;
  thumbnailURL: string;
  publisherLogo?: string;
  publisherName?: string;
  sourceURL: string;
}

export const LastestNew: React.FC<LastestNewProps> = (props) => {
  const {
    url,
    thumbnailURL,
    title,
    publishedAt,
    publisherLogo,
    publisherName,
    sourceURL,
  } = props;
  return (
    <div className="section">
      <Link to={url}>
        <div className="img-top">
          <img src={thumbnailURL || defaultThumbnail} alt="" />
        </div>
      </Link>
      <div className="description-top">
        <div className="title-top">
          <Link to={url}>{title}</Link>
        </div>
        <div className="news-source">
          <Link to={url}>
            <img
              className="logo-source"
              src={
                publisherLogo ||
                'https://photo-baomoi.zadn.vn/d59db7f26ab183efdaa0.png'
              }
              alt={publisherName}
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
