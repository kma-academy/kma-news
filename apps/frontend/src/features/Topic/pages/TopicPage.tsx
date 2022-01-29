import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowsAlt, AiOutlineStar } from 'react-icons/ai'
import { PopUp } from '../components/PopUp'
const Topic = () => {
  const [showPopUp, setShowPopUp] = useState(false)
  return (
    <div className="container">
      <div className="col-9 container-main">
        <div className="topic">
          <div className="header-topic">
            <Link to="">Chủ đề</Link>
          </div>
          <div className="topic-main">
            <div className="list-topic">
              <div className="item-topic">
                <div className="header-item-topic">
                  <div>
                    <Link to="/">Năng lượng tích cực</Link>
                    <span>
                      <AiOutlineStar />
                    </span>
                  </div>
                  <div className="icon-pop-up" onClick={() => setShowPopUp(true)}>
                    <AiOutlineArrowsAlt size="16px" />
                  </div>
                </div>
                <div className="list-news-topic">
                  <div className="list-news">
                    <div className="col-4 item-news">
                      <div className="img-item-news">
                        <Link to="/">
                          <img
                            src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_20_65_41251353/7bf856c5e5870cd95596.jpg"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="description-item-news">
                        <Link to="/">
                          <span>Cô giáo của những đứa trẻ khiếm thính</span>
                        </Link>
                        <div className="news-source">
                          <Link to="/">
                            <img
                              className="logo-source"
                              src="https://photo-baomoi.zadn.vn/a1493a27e7640e3a5775.png"
                              alt=""
                            />
                          </Link>
                          <span className="news-time">5 giờ</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 item-news">
                      <div className="img-item-news">
                        <Link to="/">
                          <img
                            src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_20_65_41251353/7bf856c5e5870cd95596.jpg"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="description-item-news">
                        <Link to="/">
                          <span>Cô giáo của những đứa trẻ khiếm thính</span>
                        </Link>
                        <div className="news-source">
                          <Link to="/">
                            <img
                              className="logo-source"
                              src="https://photo-baomoi.zadn.vn/a1493a27e7640e3a5775.png"
                              alt=""
                            />
                          </Link>
                          <span className="news-time">5 giờ</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 item-news">
                      <div className="img-item-news">
                        <Link to="/">
                          <img
                            src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_20_65_41251353/7bf856c5e5870cd95596.jpg"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="description-item-news">
                        <Link to="/">
                          <span>Cô giáo của những đứa trẻ khiếm thính</span>
                        </Link>
                        <div className="news-source">
                          <Link to="/">
                            <img
                              className="logo-source"
                              src="https://photo-baomoi.zadn.vn/a1493a27e7640e3a5775.png"
                              alt=""
                            />
                          </Link>
                          <span className="news-time">5 giờ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-topic">
                <div className="header-item-topic">
                  <div>
                    <Link to="/">Năng lượng tích cực</Link>
                    <span>
                      <AiOutlineStar />
                    </span>
                  </div>
                  <div className="icon-pop-up" onClick={() => setShowPopUp(true)}>
                    <AiOutlineArrowsAlt size="16px" />
                  </div>
                </div>
                <div className="list-news-topic">
                  <div className="list-news">
                    <div className="col-4 item-news">
                      <div className="img-item-news">
                        <Link to="/">
                          <img
                            src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_20_65_41251353/7bf856c5e5870cd95596.jpg"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="description-item-news">
                        <Link to="/">
                          <span>Cô giáo của những đứa trẻ khiếm thính</span>
                        </Link>
                        <div className="news-source">
                          <Link to="/">
                            <img
                              className="logo-source"
                              src="https://photo-baomoi.zadn.vn/a1493a27e7640e3a5775.png"
                              alt=""
                            />
                          </Link>
                          <span className="news-time">5 giờ</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 item-news">
                      <div className="img-item-news">
                        <Link to="/">
                          <img
                            src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_20_65_41251353/7bf856c5e5870cd95596.jpg"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="description-item-news">
                        <Link to="/">
                          <span>Cô giáo của những đứa trẻ khiếm thính</span>
                        </Link>
                        <div className="news-source">
                          <Link to="/">
                            <img
                              className="logo-source"
                              src="https://photo-baomoi.zadn.vn/a1493a27e7640e3a5775.png"
                              alt=""
                            />
                          </Link>
                          <span className="news-time">5 giờ</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 item-news">
                      <div className="img-item-news">
                        <Link to="/">
                          <img
                            src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_20_65_41251353/7bf856c5e5870cd95596.jpg"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="description-item-news">
                        <Link to="/">
                          <span>Cô giáo của những đứa trẻ khiếm thính</span>
                        </Link>
                        <div className="news-source">
                          <Link to="/">
                            <img
                              className="logo-source"
                              src="https://photo-baomoi.zadn.vn/a1493a27e7640e3a5775.png"
                              alt=""
                            />
                          </Link>
                          <span className="news-time">5 giờ</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 item-news">
                      <div className="img-item-news">
                        <Link to="/">
                          <img
                            src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_20_65_41251353/7bf856c5e5870cd95596.jpg"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="description-item-news">
                        <Link to="/">
                          <span>Cô giáo của những đứa trẻ khiếm thính</span>
                        </Link>
                        <div className="news-source">
                          <Link to="/">
                            <img
                              className="logo-source"
                              src="https://photo-baomoi.zadn.vn/a1493a27e7640e3a5775.png"
                              alt=""
                            />
                          </Link>
                          <span className="news-time">5 giờ</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 item-news">
                      <div className="img-item-news">
                        <Link to="/">
                          <img
                            src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_20_65_41251353/7bf856c5e5870cd95596.jpg"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="description-item-news">
                        <Link to="/">
                          <span>Cô giáo của những đứa trẻ khiếm thính</span>
                        </Link>
                        <div className="news-source">
                          <Link to="/">
                            <img
                              className="logo-source"
                              src="https://photo-baomoi.zadn.vn/a1493a27e7640e3a5775.png"
                              alt=""
                            />
                          </Link>
                          <span className="news-time">5 giờ</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 item-news">
                      <div className="img-item-news">
                        <Link to="/">
                          <img
                            src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_20_65_41251353/7bf856c5e5870cd95596.jpg"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="description-item-news">
                        <Link to="/">
                          <span>Cô giáo của những đứa trẻ khiếm thính</span>
                        </Link>
                        <div className="news-source">
                          <Link to="/">
                            <img
                              className="logo-source"
                              src="https://photo-baomoi.zadn.vn/a1493a27e7640e3a5775.png"
                              alt=""
                            />
                          </Link>
                          <span className="news-time">5 giờ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showPopUp ? <PopUp setShowPopUp={setShowPopUp} /> : ''}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topic
