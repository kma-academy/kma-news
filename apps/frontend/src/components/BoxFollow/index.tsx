import { defaultThumbnail } from '@/constants/thumnail';
import { CategoryType } from '@kma-news/api-interface';
import { Post } from 'libs/api-interface/src/post/post.interface';
import { ReactPost } from 'libs/api-interface/src/react/react-inteface';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

interface BoxFollowProps {
  data: any;
}

const BoxFollow: React.FC<BoxFollowProps> = ({ data }) => {
  return (
    <div className="box-follow">
      <div className="box-follow__logo">
        <Link to={`/bai-bao/${data.post.slug}/${data.post.id}`}>
          <img
            src={data.post.thumbnailURL || defaultThumbnail}
            alt=""
            className="box-follow__logo-m"
          />
        </Link>
      </div>
      <Link
        to={`/bai-bao/${data.post.slug}/${data.post.id}`}
        className="box-follow__name"
      >
        <div className="box-follow__name">{data.post.title}</div>
      </Link>
      <div className="box-follow__remove">X</div>
    </div>
  );
};
export default BoxFollow;
