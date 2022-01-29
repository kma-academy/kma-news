import { Types } from '@/../../shared-api/dist'
import React from 'react'
import { Link } from 'react-router-dom'

export interface NewDataSource {
  data: Types.APIResponse.GetAllPosts
}

export interface ItemNewsProps {
  data: any
}

export const ItemNews: React.FC<ItemNewsProps> = ({ children, data }) => {
  return (
    <div className="item-news-navbar">
      <div className="img-news-navbar">
        <Link to="/">
          <img
            src={
              data.thumbnailUrl ||
              'https://baomoi-static.zadn.vn/web/styles/img/logo-baomoi-gray.png'
            }
            alt=""
          />
        </Link>
      </div>
      <div className="description-item-news">
        <Link to="/">
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
          <span className="news-time">2 giờ</span>
          <span className="number-news-other">
            <Link to="/">60 liên quan</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export const ListNewsRight: React.FC<NewDataSource> = ({ data }) => {
  return (
    <div className="section">
      <div className="list-news-right">
        {data.map((e, index) => (
          <ItemNews key={index} data={e} />
        ))}
      </div>
    </div>
  )
}
