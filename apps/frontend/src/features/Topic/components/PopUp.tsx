import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from 'react-icons/io'
import { BsLink45Deg } from 'react-icons/bs'
import { Link } from 'react-router-dom'
interface PopUpProps {
  setShowPopUp: Function
}
export const PopUp: React.FC<PopUpProps> = ({ setShowPopUp }) => {
  return (
    <div className="topic-pop-up">
      <div className="list-slider-topic">
        <div className="list-topic">
          <div className="item-topic">
            <div className="header-item-topic">
              <div>
                <Link to="/">Năng lượng tích cực</Link>
                <span>
                  <AiOutlineStar />
                </span>
              </div>
              <div className="icon-pop-up" onClick={() => setShowPopUp(false)}>
                <IoIosClose size="20px" />
              </div>
            </div>
            <div className="list-news-topic">
              <div className="col-3 item-news-navbar">
                <div className="img-news-navbar">
                  <Link to="/">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_20_119_41257900/d818eb1cf85e1100484f.jpg"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="description-item-news">
                  <Link to="/">
                    <span>Báo Thái Lan: 'Đã đến lúc chặn kỷ lục của HLV Park'</span>
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
                  </div>
                </div>
              </div>
              <div className="col-3 item-news-navbar">
                <div className="img-news-navbar">
                  <Link to="/">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_20_119_41257900/d818eb1cf85e1100484f.jpg"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="description-item-news">
                  <Link to="/">
                    <span>Báo Thái Lan: 'Đã đến lúc chặn kỷ lục của HLV Park'</span>
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
                  </div>
                </div>
              </div>
              <div className="col-3 item-news-navbar">
                <div className="img-news-navbar">
                  <Link to="/">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_20_119_41257900/d818eb1cf85e1100484f.jpg"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="description-item-news">
                  <Link to="/">
                    <span>Báo Thái Lan: 'Đã đến lúc chặn kỷ lục của HLV Park'</span>
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
                  </div>
                </div>
              </div>
              <div className="col-3 item-news-navbar">
                <div className="img-news-navbar">
                  <Link to="/">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_20_119_41257900/d818eb1cf85e1100484f.jpg"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="description-item-news">
                  <Link to="/">
                    <span>Báo Thái Lan: 'Đã đến lúc chặn kỷ lục của HLV Park'</span>
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
                  </div>
                </div>
              </div>
              <div className="col-3 item-news-navbar">
                <div className="img-news-navbar">
                  <Link to="/">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_20_119_41257900/d818eb1cf85e1100484f.jpg"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="description-item-news">
                  <Link to="/">
                    <span>Báo Thái Lan: 'Đã đến lúc chặn kỷ lục của HLV Park'</span>
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
                  </div>
                </div>
              </div>
              <div className="col-3 item-news-navbar">
                <div className="img-news-navbar">
                  <Link to="/">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_20_119_41257900/d818eb1cf85e1100484f.jpg"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="description-item-news">
                  <Link to="/">
                    <span>Báo Thái Lan: 'Đã đến lúc chặn kỷ lục của HLV Park'</span>
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
                  </div>
                </div>
              </div>
              <div className="col-3 item-news-navbar">
                <div className="img-news-navbar">
                  <Link to="/">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_20_119_41257900/d818eb1cf85e1100484f.jpg"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="description-item-news">
                  <Link to="/">
                    <span>Báo Thái Lan: 'Đã đến lúc chặn kỷ lục của HLV Park'</span>
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
                  </div>
                </div>
              </div>
              <div className="col-3 item-news-navbar">
                <div className="img-news-navbar">
                  <Link to="/">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_20_119_41257900/d818eb1cf85e1100484f.jpg"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="description-item-news">
                  <Link to="/">
                    <span>Báo Thái Lan: 'Đã đến lúc chặn kỷ lục của HLV Park'</span>
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
                  </div>
                </div>
              </div>
              <div className="col-3 item-news-navbar">
                <div className="img-news-navbar">
                  <Link to="/">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_20_119_41257900/d818eb1cf85e1100484f.jpg"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="description-item-news">
                  <Link to="/">
                    <span>Báo Thái Lan: 'Đã đến lúc chặn kỷ lục của HLV Park'</span>
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
                  </div>
                </div>
              </div>
              <div className="col-3 item-news-navbar">
                <div className="img-news-navbar">
                  <Link to="/">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_20_119_41257900/d818eb1cf85e1100484f.jpg"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="description-item-news">
                  <Link to="/">
                    <span>Báo Thái Lan: 'Đã đến lúc chặn kỷ lục của HLV Park'</span>
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
                  </div>
                </div>
              </div>
              <div className="col-3 item-news-navbar">
                <div className="img-news-navbar">
                  <Link to="/">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_20_119_41257900/d818eb1cf85e1100484f.jpg"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="description-item-news">
                  <Link to="/">
                    <span>Báo Thái Lan: 'Đã đến lúc chặn kỷ lục của HLV Park'</span>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="link-topic">
          <Link to="/">
            <BsLink45Deg size="30px" />
            <span>Xem chi tiết chủ đề</span>
          </Link>
        </div>
        <div className="btn-arrow-left">
          <IoIosArrowBack size="25px" />
        </div>
        <div className="btn-arrow-right">
          <IoIosArrowForward size="25px" />
        </div>
      </div>
    </div>
  )
}