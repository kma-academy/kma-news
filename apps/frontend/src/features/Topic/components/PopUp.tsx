/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from 'react-icons/io';
import { BsLink45Deg } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectTopicContents } from '../topicSlice';
import { defaultThumbnail } from '@/constants/thumnail';
interface PopUpProps {
  onClose: () => void;
}
export const PopUp: React.FC<PopUpProps> = ({ onClose: setShowPopUp }) => {
  const topicContent = useAppSelector(selectTopicContents);
  if (topicContent)
    return (
      <div className="topic-pop-up">
        <div className="list-slider-topic">
          <div className="list-topic">
            <div className="item-topic">
              <div className="header-item-topic">
                <div>
                  <Link to={topicContent.url}>{topicContent.name}</Link>
                  <span>
                    <AiOutlineStar />
                  </span>
                </div>
                <div className="icon-pop-up" onClick={() => setShowPopUp()}>
                  <IoIosClose size="20px" />
                </div>
              </div>
              <div className="list-news-topic">
                {topicContent.contents.map((content, i) => (
                  <div className="col-3 item-news-navbar" key={i}>
                    <div className="img-news-navbar">
                      <Link to="/">
                        <img
                          src={content.thumbnailURL || defaultThumbnail}
                          alt={content.title}
                        />
                      </Link>
                    </div>

                    <div className="description-item-news">
                      <Link to={content.url}>
                        <span>{content.title}</span>
                      </Link>
                      <div className="news-source">
                        <Link to={content.url}>
                          <img
                            className="logo-source"
                            src={content.publisher.logo}
                            alt={content.publisher.name}
                          />
                        </Link>
                        <span className="news-time">2 giờ</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="link-topic">
            <Link to={topicContent.url}>
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
    );
  return null;
};
