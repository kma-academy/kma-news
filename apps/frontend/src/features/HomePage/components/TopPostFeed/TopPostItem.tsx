import { defaultThumbnail } from '@/constants/thumnail';
import { TopPostResponse } from '@kma-news/api-interface';
import moment from 'moment';
import { Link } from 'react-router-dom';

export type TopPostItemProps = Pick<
  TopPostResponse[0],
  'url' | 'thumbnailURL' | 'title' | 'publishedAt'
>;

export const TopPostItem: React.FC<TopPostItemProps> = ({
  url,
  thumbnailURL,
  title,
  publishedAt,
}) => {
  return (
    <div className="item-news-navbar">
      <div className="img-news-navbar">
        <Link to={url}>
          <img src={thumbnailURL || defaultThumbnail} alt="" />
        </Link>
      </div>
      <div className="description-item-news">
        <Link to={url}>
          <span>{title}</span>
        </Link>
        <div className="news-source">
          <Link to="/">
            <img
              className="logo-source"
              src="https://photo-baomoi.zadn.vn/d59db7f26ab183efdaa0.png"
              alt=""
            />
          </Link>
          <span className="news-time">
            {moment(publishedAt).locale('vi').fromNow()}
          </span>
          <span className="number-news-other">
            <Link to="/">60 liên quan</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
