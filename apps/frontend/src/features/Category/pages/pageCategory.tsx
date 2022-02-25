import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  getPostsByCategoryAction,
  searchCategoryAction,
  selectData,
  selectPostByCategory,
} from '../categorySlice';
import { defaultThumbnail } from '@/constants/thumnail';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const pageCategory: React.FC = () => {
  const { subItem } = useParams();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const listPost = useAppSelector(selectPostByCategory);
  useEffect(() => {
    if (subItem) dispatch(searchCategoryAction(subItem));
  }, [dispatch, subItem]);
  useEffect(() => {
    if (data.length > 0) dispatch(getPostsByCategoryAction(data[0].id));
  }, [dispatch, data]);
  return (
    <div className="container">
      <div className="col-9 container-main">
        <div className="content">
          <div className="col-8 content-left">
            {data.length > 0 && (
              <div>
                <div className="title-news-navbar">{data[0].title}</div>
                <div className="list-news-navbar">
                  {listPost.map((e, i) => (
                    <div className="item-news-navbar" key={i}>
                      <div className="img-news-navbar">
                        <a href={e.url}>
                          <img
                            src={e.thumbnailURL || defaultThumbnail}
                            alt={e.title}
                          />
                        </a>
                      </div>
                      <div className="description-item-news">
                        <a href={e.url}>
                          <span>{e.title}</span>
                        </a>
                        <div className="news-source">
                          <a href={e.url}>
                            <img
                              className="logo-source"
                              src="https://baomoi-static.zadn.vn/web/styles/img/logo-baomoi-gray.png"
                              alt="VietNamNet"
                            />
                          </a>
                          <span className="news-time">
                            {moment(e.publishedAt).locale('vi').fromNow()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="btn-list-posts">
                  <a href="/chu-de/1">Xem thêm</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default pageCategory;
