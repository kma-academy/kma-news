import React, { useMemo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import BoxVideo from '../../../components/BoxVideo';
import BoxHot from '../../../components/BoxHot';
import BoxNews from '../../../components/BoxNews';
import { IoIosArrowForward } from 'react-icons/io';
import { AiOutlineStar } from 'react-icons/ai';
import { BiLike } from 'react-icons/bi';
import { VscTag } from 'react-icons/vsc';
import { GoReport } from 'react-icons/go';
import { HiOutlineDocumentDuplicate, HiOutlineKey } from 'react-icons/hi';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FullScreenImage } from '../components/FullScreenImage';
import {
  selectData,
  getPostAction,
  selectLoading,
  selectError,
} from '../postSlice';
import { CommentBox } from '../components/Comments/CommentBox';
import { PostOther } from '../components/PostOther';

import {
  getSavePostAction,
  selectSave,
  savePostAction,
  deleteSavePostAction,
  selectIdSave,
} from '@kma-news/save-slice';

import { createReatPostAction } from 'libs/react-post-slice/src';
import { getReactByPost } from 'libs/api-interface/src/react';

interface ImageDetail {
  id: number;
  url: string;
  description?: string;
}

const ReadingPage: React.FC = () => {
  const { slug, id } = useParams<'slug' | 'id'>();
  const [visible, toggleVisible] = useState(false);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const isSave = useAppSelector(selectSave);
  const idSave = useAppSelector(selectIdSave);
  const navigate = useNavigate();

  const [activeReact, setActiveReact] = useState(false);

  useEffect(() => {
    if (id) dispatch(getPostAction(+id));
  }, [dispatch, id]);
  useEffect(() => {
    if (loading === 'done' && data?.slug !== slug) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  useEffect(() => {
    if (id) dispatch(getSavePostAction(parseInt(id)));
  }, [dispatch, id]);

  const btnReactPost = () => {
    if (id) {
      dispatch(createReatPostAction(+id));
    }
  };

  const allImages = useMemo(() => {
    return data?.paragraphs
      .filter((e) => e.type === 'image')
      .map((e, i) => {
        return {
          id: i + 1,
          url: e.imageURL[0],
          description: e.content,
        };
      }) as ImageDetail[];
  }, [data]);

  return (
    <>
      {visible && allImages.length > 0 && (
        <FullScreenImage
          arrImg={allImages}
          visible={visible}
          toggleVisible={toggleVisible}
        />
      )}
      <div className="container container--positions">
        <div className="col-9 container-main ">
          <div className="indexPath">
            {data?.categories.map((e, i) => {
              return (
                <React.Fragment key={`category-${i}`}>
                  <h3 className="indexPath-name">
                    <Link to={e.url}>{e.title}</Link>
                  </h3>
                  <IoIosArrowForward className="indexPath-icon" />
                </React.Fragment>
              );
            })}
          </div>
          <div className="content">
            <div className="col-8 content-left">
              <div className="news-content">
                <div className="news">
                  <div className="page-title">
                    <h1 className="page-title-content">{data?.title}</h1>
                  </div>
                  <div className="page-extension">
                    <img
                      src={
                        data?.publisher?.logo ||
                        'https://photo-baomoi.zadn.vn/a1493a27e7640e3a5775.png'
                      }
                      className="page-extension-brand"
                      alt={data?.publisher?.name}
                    />
                    <AiOutlineStar className="page-extension-icon--like" />
                    <h3 className="page-extension-font ">
                      {data?.publishedAt &&
                        new Date(data.publishedAt).toLocaleString('en-US')}
                    </h3>
                    <h3 className="page-extension-font page-extension-font--action">
                      7 đăng lại
                    </h3>
                    <h3 className="page-extension-font page-extension-font--action">
                      63 liên quan
                    </h3>
                    <div className="page-extension-origin">
                      <HiOutlineDocumentDuplicate className="page-extension-icon--origin" />
                      <h3
                        className="page-extension-font page-extension-font--action"
                        onClick={() => window.open(data?.sourceURL, '_blank')}
                      >
                        Gốc
                      </h3>
                    </div>
                  </div>
                  <div className="page-desc">{data?.description}</div>
                  {data?.paragraphs.map((paragraph, i) => {
                    if (paragraph.type === 'text') {
                      return (
                        <p className="page-word" key={i}>
                          {paragraph.content}
                        </p>
                      );
                    }

                    return (
                      <React.Fragment key={i}>
                        <p
                          className="page-img"
                          onClick={() => toggleVisible(true)}
                        >
                          <img
                            src={paragraph.imageURL[0]}
                            alt=""
                            className="page-img-content"
                          />
                        </p>
                        <p className="page-caption">{paragraph.content}</p>
                      </React.Fragment>
                    );
                  })}
                  <p className="page-author">{data?.owner || 'Sưu tầm'} </p>
                </div>
                <div className="action">
                  <div className="action-box">
                    <div className="action--m action-share-zalo"></div>
                    <div className="action--m action-share-face"></div>
                    <div
                      className="action--m action-like"
                      onClick={btnReactPost}
                      <BiLike className="action-like--hover" />
                    </div>
                    <div className={
                        isSave
                          ? 'action--m action-isLiked'
                          : 'action--m action-like'
                      }
                      onClick={() => {
                        if (data?.id && isSave == false)
                          dispatch(savePostAction(data.id));
                        if (data?.id && isSave == true)
                          if (idSave) dispatch(deleteSavePostAction(idSave));
                      }}>
                      <VscTag className="action-save--hover" />
                    </div>
                    <div className="action--m action-report">
                      <GoReport className="action-report--hover" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="page-key">
                <HiOutlineKey className="page-key-icon" />
                <div className="page-key-box">
                  <ul className="page-key-list">
                    {data?.keywords.map((e, i) => (
                      <li className="page-key-item" key={`keyword-${i}`}>
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="page-source">
                Nguồn{' '}
                <span className="page-source-name">
                  {data?.publisher?.name || 'Sưu tầm'}
                </span>
                {': '}
                <span className="page-source-link">
                  <a href={data?.sourceURL || '#'}>{data?.sourceURL}</a>
                </span>
              </p>
              <CommentBox />
              <PostOther />
              <div className="page-news">
                <div className="page-news-header">
                  <p className="page-news-title">TIN KHÁC</p>
                  <div className="page-news-decor"></div>
                </div>
                <div className="page-news-content">
                  {Array.from(Array(4)).map((e, i) => (
                    <BoxNews
                      url="#"
                      publishedAt={new Date().toISOString()}
                      description="Bai bao rat hay"
                      key={i}
                    />
                  ))}
                </div>
              </div>
              <div className="page-news">
                <div className="page-news-header">
                  <p className="page-news-title">TIN NÓNG</p>
                  <div className="page-news-decor"></div>
                </div>
                <div className="page-news-content">
                  {Array.from(Array(4)).map((e, i) => (
                    <BoxNews
                      url="#"
                      publishedAt={new Date().toISOString()}
                      description="Bai bao rat hay"
                      key={i}
                    />
                  ))}
                </div>
              </div>
              <div className="page-news">
                <div className="page-news-header">
                  <p className="page-news-title">TIN MỚI</p>
                  <div className="page-news-decor"></div>
                </div>
                <div className="page-news-content">
                  {Array.from(Array(4)).map((e, i) => (
                    <BoxNews
                      url="#"
                      publishedAt={new Date().toISOString()}
                      description="Bai bao rat hay"
                      key={i}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-4 content-right">
              <div className="videoFrame">
                <div className="videoFrame-header">
                  <h3 className="videoFrame-title">VIDEO</h3>
                  <div className="videoFrame-decor"></div>
                </div>
                <div className="videoFrame-content">
                  <BoxVideo />
                  <BoxVideo />
                  <BoxVideo />
                </div>
              </div>
              <div className="hotFrame">
                <div className="hotFrame-header">
                  <h3 className="hotFrame-title">NÓNG 24H</h3>
                  <div className="hotFrame-decor"></div>
                </div>
                <div className="hotFrame-content">
                  <BoxHot />
                  <BoxHot />
                  <BoxHot />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReadingPage;
