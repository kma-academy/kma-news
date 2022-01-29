import React from 'react'
import { Covid19Feed } from '@/features/covid19/components/Covid19Feed'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ListNewsRight } from '../components/ListNewsRight'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchNewFeedAction } from '../homeSlice'
import { useEffect } from 'react'
import { selectData } from '@/features/HomePage/homeSlice'
import { selectHomeTopics, getHomeTopicsAction } from '@/features/Topic/topicSlice'
import { LocationNews } from '../components/LocationNews'
import { PublisherList } from '../components/PublisherList'
import { TopicPost } from '../components/TopicPost'
import { RecentNews } from '../components/RecentNews'
const Home = () => {
  const [activeSelectWeather, setActiveSelectWeather] = useState(false)
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectData)
  const topics = useAppSelector(selectHomeTopics)
  useEffect(() => {
    dispatch(fetchNewFeedAction({ limit: 4 }))
    dispatch(getHomeTopicsAction())
  }, [dispatch])
  return (
    <div className="container">
      {data.length > 0 && (
        <div className="col-9 container-main">
          <div className="content">
            <div className="col-8 content-left">
              <RecentNews />
              {topics.map((topic, i) => (
                <TopicPost name={topic.name} contents={topic.contents} key={`topic-${i}`} />
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
              <ListNewsRight data={data} />
              <PublisherList />
              <div className="section">
                <div className="space"></div>
              </div>
              <div className="section">
                <div className="HCM">
                  <div className="img-news-HCM">
                    <img src="https://baomoi-static.zadn.vn/events/banner_hcm_02-min.png" alt="" />
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
                            Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ
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
                            Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ
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
                            Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ
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
                  <div className="content-utilities">
                    <div className="content-weather">
                      <div className="weather-header">
                        <div className="img-weather">
                          <img
                            src="https://baomoi-static.zadn.vn/infoservice/images/weathericons/set61/21.svg"
                            alt=""
                          />
                        </div>
                        <div className="temperature">
                          <h3>24º</h3>
                          <span>18º - 24º</span>
                        </div>
                        <div className="weather-detail">
                          <span>Mây rải rác</span>
                          <span>Độ ẩm: 79%</span>
                          <span>Gió: 5km/h</span>
                          <span>Khả năng mưa: 2%</span>
                        </div>
                      </div>
                      <div className="location-select">
                        <div
                          className="name-select"
                          onClick={() => setActiveSelectWeather(!activeSelectWeather)}
                        >
                          Bển tre
                          <RiArrowDropDownLine />
                        </div>
                        <div
                          className="option-select"
                          style={!activeSelectWeather ? { display: 'none' } : { display: 'block' }}
                        >
                          <ul className="list-select">
                            <li className="item-select">An Giang</li>
                            <li className="item-select">BR-VT</li>
                            <li className="item-select">Bắc Giang</li>
                            <li className="item-select">Bắc Cạn</li>
                            <li className="item-select">Bạc Liêu</li>
                            <li className="item-select">Bắc Ninh</li>
                            <li className="item-select">Bến Tre</li>
                            <li className="item-select">Bình Dương</li>
                            <li className="item-select">Bình Định</li>
                            <li className="item-select">Bình Phước</li>
                            <li className="item-select">Bình Thuận</li>
                            <li className="item-select">Cà Mau</li>
                            <li className="item-select">Cần Thơ</li>
                            <li className="item-select">Cao Bằng</li>
                            <li className="item-select">Đà Nẵng</li>
                            <li className="item-select">Đăk Lăk</li>
                            <li className="item-select">Đồng Nai</li>
                            <li className="item-select">Đồng Tháp</li>
                            <li className="item-select">Gia Lai</li>
                            <li className="item-select">Hà Giang</li>
                            <li className="item-select">Hà Nam</li>
                            <li className="item-select">Hà Nội</li>
                            <li className="item-select">Hà Tĩnh</li>
                            <li className="item-select">Hải Dương</li>
                            <li className="item-select">Hải Phòng</li>
                            <li className="item-select">Hòa Bình</li>
                            <li className="item-select">Hưng yên</li>
                            <li className="item-select">Kiên Giang</li>
                            <li className="item-select">Kon Tum</li>
                            <li className="item-select">Khánh Hòa</li>
                            <li className="item-select">Lai Châu</li>
                            <li className="item-select">Lạng Sơn</li>
                            <li className="item-select">Lào Cai</li>
                            <li className="item-select">Lâm Đồng</li>
                            <li className="item-select">Long AN</li>
                            <li className="item-select">Nam Định</li>
                            <li className="item-select">Ninh Bình</li>
                            <li className="item-select">Ninh Thuận</li>
                            <li className="item-select">Nghệ An</li>
                            <li className="item-select">Phú Thọ</li>
                            <li className="item-select">Phú Yên</li>
                            <li className="item-select">Quảng Bình</li>
                            <li className="item-select">Quảng Nam</li>
                            <li className="item-select">Quảng Ninh</li>
                            <li className="item-select">Quảng Ngãi</li>
                            <li className="item-select">Quảng Trị</li>
                            <li className="item-select">Sóc Trăng</li>
                            <li className="item-select">Sơn La</li>
                            <li className="item-select">Tây Ninh</li>
                            <li className="item-select">Tiền Giang</li>
                            <li className="item-select">TP.HCM</li>
                            <li className="item-select">TT Huế</li>
                            <li className="item-select">Tuyên Quang</li>
                            <li className="item-select">Thái Bình</li>
                            <li className="item-select">Thái Nguyên</li>
                            <li className="item-select">Thanh Hóa</li>
                            <li className="item-select">Trà Vinh</li>
                            <li className="item-select">Vĩnh Long</li>
                            <li className="item-select">Vĩnh Phúc</li>
                            <li className="item-select">Yên Bái</li>
                            <li className="item-select">Đăk Nông</li>
                            <li className="item-select">Hậu Giang</li>
                            <li className="item-select">Điện Biên</li>
                          </ul>
                        </div>
                        <div className="weather-forecast">
                          <div className="list-day">
                            <div className="item-day">
                              <span>17/12</span>
                              <div className="img-weather-day">
                                <img
                                  src="https://baomoi-static.zadn.vn/infoservice/images/weathericons/set61/28.svg"
                                  alt=""
                                />
                              </div>
                              <span>15º - 24º</span>
                              <span></span>
                            </div>
                            <div className="item-day">
                              <span>18/12</span>
                              <div className="img-weather-day">
                                <img
                                  src="https://baomoi-static.zadn.vn/infoservice/images/weathericons/set61/28.svg"
                                  alt=""
                                />
                              </div>
                              <span>15º - 24º</span>
                              <span></span>
                            </div>
                            <div className="item-day">
                              <span>19/12</span>
                              <div className="img-weather-day">
                                <img
                                  src="https://baomoi-static.zadn.vn/infoservice/images/weathericons/set61/28.svg"
                                  alt=""
                                />
                              </div>
                              <span>15º - 24º</span>
                              <span></span>
                            </div>
                            <div className="item-day">
                              <span>20/12</span>
                              <div className="img-weather-day">
                                <img
                                  src="https://baomoi-static.zadn.vn/infoservice/images/weathericons/set61/28.svg"
                                  alt=""
                                />
                              </div>
                              <span>15º - 24º</span>
                              <span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                            Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ
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
  )
}

export default Home
