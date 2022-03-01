/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React from 'react';
import { Covid19Feed } from '@/features/covid19/components/Covid19Feed';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchNewFeedAction, fetchTopPostAction } from '../homeSlice';
import { useEffect } from 'react';
import { selectData } from '@/features/HomePage/homeSlice';
import {
  selectHomeTopics,
  getHomeTopicsAction,
} from '@/features/Topic/topicSlice';
import { LocationNews } from '../components/LocationNews';
import { PublisherList } from '../components/PublisherList';
import { TopicPost } from '../components/TopicPost';
import { RecentNews } from '../components/RecentNews';
import { WeatherFeed } from '@/features/Weather/WeatherFeed';
import { TopPostFeed } from '../components/TopPostFeed';
const Home = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const topics = useAppSelector(selectHomeTopics);
  useEffect(() => {
    dispatch(fetchNewFeedAction({ limit: 4 }));
    dispatch(getHomeTopicsAction());
    dispatch(fetchTopPostAction({ limit: 10 }));
  }, [dispatch]);
  return (
    <div className="container">
      {data.length > 0 && (
        <div className="col-9 container-main">
          <div className="content">
            <div className="col-8 content-left">
              <RecentNews />
              {topics.map((topic, i) => (
                <TopicPost
                  name={topic.name}
                  contents={topic.contents}
                  url={topic.url}
                  key={`topic-${i}`}
                />
              ))}
              <div className="btn-group">
                <div className="btn-prev">
                  <Link to="">Quay lại</Link>
                </div>
                <div className="btn-next">
                  <Link to="">Xem thêm</Link>
                </div>
              </div>
            </div>
            <div className="col-4 content-right">
              <TopPostFeed />
              <PublisherList />
              <div className="section">
                <div className="space"></div>
              </div>
              <div className="section">
                <div className="HCM">
                  <div className="img-news-HCM">
                    <img
                      src="https://baomoi-static.zadn.vn/events/banner_hcm_02-min.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <Covid19Feed />
              <LocationNews />
              <div className="section">
                <div className="news-video">
                  <div className="news-tilte">
                    <h3>Video</h3>
                  </div>
                  <div className="list-news-right">
                    <div className="item-news-navbar">
                      <div className="img-news-navbar">
                        <Link to="/">
                          <img
                            src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="description-item-news">
                        <Link to="/">
                          <span>
                            Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt
                            tuyến phố cổ
                          </span>
                        </Link>
                        <div className="news-source">
                          <Link to="/">
                            <img
                              className="logo-source"
                              src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
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
                  </div>
                </div>
              </div>
              <div className="section">
                <div className="news-photo">
                  <div className="news-tilte">
                    <h3>Photo</h3>
                  </div>
                  <div className="list-news-right">
                    <div className="item-news-navbar">
                      <div className="list-img-photo">
                        <Link to="">
                          <div className="img-news-navbar">
                            <img
                              src="https://photo-baomoi.zadn.vn/w300_r4x3_sm/2021_12_16_181_41214739/c2a695122750ce0e9741.jpg"
                              alt=""
                            />
                          </div>
                        </Link>
                        <Link to="">
                          <div className="img-news-navbar">
                            <img
                              src="https://photo-baomoi.zadn.vn/w300_r4x3/2021_12_16_181_41214739/669028249a6673382a77.jpg"
                              alt=""
                            />
                          </div>
                        </Link>
                        <Link to="">
                          <div className="img-news-navbar">
                            <img
                              src="https://photo-baomoi.zadn.vn/w300_r4x3/2021_12_16_181_41214739/c02d959927dbce8597ca.jpg"
                              alt=""
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="description-item-news">
                        <Link to="/">
                          <span>
                            Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt
                            tuyến phố cổ
                          </span>
                        </Link>
                        <div className="news-source">
                          <Link to="/">
                            <img
                              className="logo-source"
                              src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
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
                  </div>
                </div>
              </div>
              <div className="section">
                <div className="news-hot">
                  <div className="news-tilte">
                    <h3>Nóng 24h</h3>
                  </div>
                  <div className="list-news-right">
                    <div className="item-news-navbar">
                      <div className="img-news-navbar">
                        <Link to="/">
                          <img
                            src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="description-item-news">
                        <Link to="/">
                          <span>
                            Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt
                            tuyến phố cổ
                          </span>
                        </Link>
                        <div className="news-source">
                          <Link to="/">
                            <img
                              className="logo-source"
                              src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
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
                  </div>
                </div>
              </div>
              <div className="section">
                <div className="news-utilities">
                  <div className="news-tilte">
                    <h3>Tiện ích</h3>
                  </div>
                  <WeatherFeed />
                  <div className="content-other">
                    <div>
                      <span>thời tiết</span>
                      <span>tỷ giá ngoại tệ</span>
                      <span>kết quả sổ số</span>
                      <span>lịch truyền hình</span>
                      <span>cung hoàng đạo</span>
                      <span>bảng giá xe ô tô</span>
                    </div>
                    <div>
                      <span>lịch vạn niên</span>
                      <span>giá vàng</span>
                      <span>chứng khoán</span>
                      <span>lịch chiếu phim</span>
                      <span>giá xăng, dầu</span>
                      <span>bảng giá xe máy</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section">
                <div className="news-analysis">
                  <div className="news-tilte">
                    <h3>GÓC NHÌN & PHÂN TÍCH</h3>
                  </div>
                  <div className="list-news-right">
                    <div className="item-news-navbar">
                      <div className="img-news-navbar">
                        <Link to="/">
                          <img
                            src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="description-item-news">
                        <Link to="/">
                          <span>
                            Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt
                            tuyến phố cổ
                          </span>
                        </Link>
                        <div className="news-source">
                          <Link to="/">
                            <img
                              className="logo-source"
                              src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
