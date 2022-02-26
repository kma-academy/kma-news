import { defaultThumbnail } from '@/constants/thumnail';
import { PostResponse, RecentPostResponse } from '@kma-news/api-interface';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

export interface NewDataSource {
  data: RecentPostResponse;
}

export interface ItemNewsProps {
  data: PostResponse;
}

export const ItemNews: React.FC<ItemNewsProps> = ({ children, data }) => {
  return (
    <div className="item-news-navbar">
      <div className="img-news-navbar">
        <Link to={data.url}>
          <img src={data.thumbnailURL || defaultThumbnail} alt="" />
        </Link>
      </div>
      <div className="description-item-news">
        <Link to={data.url}>
          <span>{data.title}</span>
        </Link>
        <div className="news-source">
          <Link to="/">
            <img
              className="logo-source"
              src="https://photo-baomoi.zadn.vn/d59db7f26ab183efdaa0.png"
              alt=""
            />
          </Link>
          <span className="news-time">{moment(data.publishedAt).locale('vi').fromNow()}</span>
          <span className="number-news-other">
            <Link to="/">60 liên quan</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export const ListNewsRight: React.FC<NewDataSource> = ({ data }) => {
  return (
    <div className="section">
      <div className="list-news-right">
        {data.map((e, index) => (
          <ItemNews key={index} data={e} />
        ))}
      </div>
    </div>
  );
};
