import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { defaultThumbnail } from '@/constants/thumnail';
import { fetchNewFeedAction, selectData } from '@/features/HomePage/homeSlice';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
const newPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const param = useParams();
  const page = param.page || '1';
  useEffect(() => {
    dispatch(fetchNewFeedAction({ limit: 30, page: +page }));
    window.scroll(0, 0);
  }, [dispatch, page]);
  return (
    <div className="container">
      <div className="col-9 container-main">
        <div className="content">
          <div className="col-8 content-left">
            {data.length > 0 && (
              <div>
                <div className="title-news-navbar">Tin Mới</div>
                <div className="list-news-navbar">
                  {data.map((e, i) => (
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
                            {e.publisher !== null ? (
                              <img
                                className="logo-source"
                                src={e.publisher.logo}
                                alt="VietNamNet"
                              />
                            ) : (
                              <img
                                className="logo-source"
                                src={defaultThumbnail}
                                alt="VietNamNet"
                              />
                            )}
                          </a>
                          <span className="news-time">
                            {moment(e.publishedAt).locale('vi').fromNow()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="btnPage">
                  {+page > 1 && (
                    <div className="btn-list-posts prev">
                      <Link to={`/tin-moi/${+page - 1}`}>Quay lại</Link>
                    </div>
                  )}
                  <div className="btn-list-posts next">
                    <Link to={`/tin-moi/${+page + 1}`}>Xem tiếp</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default newPage;
