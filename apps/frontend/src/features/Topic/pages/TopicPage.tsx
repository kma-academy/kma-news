/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineArrowsAlt, AiOutlineStar } from 'react-icons/ai';
import { PopUp } from '../components/PopUp';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  getHomeTopicsAction,
  getPostsOnTopicAction,
  selectHomeTopics,
} from '../topicSlice';
import { defaultThumbnail } from '@/constants/thumnail';
const Topic = () => {
  const [isShowMore, setShowPopUp] = useState(false);
  const topics = useAppSelector(selectHomeTopics);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getHomeTopicsAction());
  }, [dispatch]);
  const handleShowMore = (id: number) => {
    dispatch(
      getPostsOnTopicAction({
        topicId: id,
        limit: 10,
      })
    );
    setShowPopUp(true);
  };
  return (
    <div className="container">
      <div className="col-9 container-main">
        <div className="topic">
          <div className="header-topic">
            <Link to="">Chủ đề</Link>
          </div>
          <div className="topic-main">
            <div className="list-topic">
              {topics.map(
                (topic, i) =>
                  topic.contents.length > 0 && (
                    <div className="item-topic" key={i}>
                      <div className="header-item-topic">
                        <div>
                          <Link to="/">{topic?.name}</Link>
                          <span>
                            <AiOutlineStar />
                          </span>
                        </div>
                        <div
                          className="icon-pop-up"
                          onClick={() => handleShowMore(topic.id)}
                        >
                          <AiOutlineArrowsAlt size="16px" />
                        </div>
                      </div>
                      <div className="list-news-topic">
                        <div className="list-news">
                          {topic.contents.map((content, i) => (
                            <div className="col-4 item-news" key={i}>
                              <div className="img-item-news">
                                <Link to={content.url}>
                                  <img
                                    src={
                                      content.thumbnailURL || defaultThumbnail
                                    }
                                    alt={content.title}
                                  />
                                </Link>
                              </div>

                              <div className="description-item-news">
                                <Link to={content.url}>
                                  <span>{content.title}</span>
                                </Link>
                                <div className="news-source">
                                  <Link to={content.title}>
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
                          ))}
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
            {isShowMore && <PopUp onClose={() => setShowPopUp(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
