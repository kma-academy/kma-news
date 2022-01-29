import React, { useMemo, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import BoxVideo from '@/components/BoxVideo'
import BoxHot from '@/components/BoxHot'
import BoxNews from '@/components/BoxNews'
import { IoIosArrowForward } from 'react-icons/io'
import { AiOutlineStar } from 'react-icons/ai'
import { BiLike } from 'react-icons/bi'
import { VscTag } from 'react-icons/vsc'
import { GoReport } from 'react-icons/go'
import { HiOutlineDocumentDuplicate, HiOutlineKey } from 'react-icons/hi'
import { selectData, getPostAction } from '../postSlice'
import { useParams } from 'react-router-dom'
import { FullScreenImage } from '../components/FullScreenImage'
import { IParagraphImage } from 'shared-types'
// import '../components/HotTopic/'
interface ImageDetail {
  id: number
  url: string
  description?: string
}

const ReadingPage = () => {
  const { slug } = useParams<'slug'>()
  const [visible, toggleVisible] = useState(false)
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectData)
  useEffect(() => {
    if (slug) dispatch(getPostAction(slug))
  }, [dispatch, slug])
  const allImages = useMemo(() => {
    return data?.paragraphs
      .filter((e) => e.type === 'image')
      .map((e, i) => {
        const paragraph = e as IParagraphImage
        return {
          id: i + 1,
          url: paragraph.imageUrl[0],
          description: paragraph.description,
        }
      }) as ImageDetail[]
  }, [data])
  return (
    <>
      {visible && allImages.length > 0 && (
        <FullScreenImage arrImg={allImages} visible={visible} toggleVisible={toggleVisible} />
      )}
      <div className="container container--positions">
        <div className="col-9 container-main ">
          <div className="indexPath">
            <h3 className="indexPath-name">Xã hội</h3>
            <IoIosArrowForward className="indexPath-icon" />
            <h3 className="indexPath-name">Thời sự</h3>
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
                    <h3 className="page-extension-font">{data?.publishedAt}</h3>
                    <h3 className="page-extension-font">7 đăng lại</h3>
                    <h3 className="page-extension-font">63 liên quan</h3>
                    <div className="page-extension-origin">
                      <HiOutlineDocumentDuplicate className="page-extension-icon--origin" />
                      <h3 className="page-extension-font">
                        <a href="/#">s</a>
                      </h3>
                    </div>
                  </div>
                  <div className="page-desc">{data?.description}</div>
                  {data?.paragraphs.map((paragraph) => {
                    if (paragraph.type === 'text')
                      return <p className="page-word">{paragraph.content}</p>

                    return (
                      <>
                        <p className="page-img" onClick={() => toggleVisible(true)}>
                          <img src={paragraph.imageUrl[0]} alt="" className="page-img-content" />
                        </p>
                        <p className="page-caption">{paragraph.description}</p>
                      </>
                    )
                  })}
                  <p className="page-author">{data?.owner || 'Sưu tầm'} </p>
                </div>
                <div className="action">
                  <div className="action-box">
                    <div className="action--m action-share-zalo"></div>
                    <div className="action--m action-share-face"></div>
                    <div className="action--m action-like">
                      <BiLike className="action-like--hover" />
                    </div>
                    <div className="action--m action-save">
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
                    <li className="page-key-item">Tổng Bí Thư</li>
                    <li className="page-key-item">Ngoại Giao</li>
                    <li className="page-key-item">Bản Sắc</li>
                    <li className="page-key-item">Trường Phái</li>
                    <li className="page-key-item">Can Trường</li>
                    <li className="page-key-item">Khôn Khéo</li>
                    <li className="page-key-item">Dân Tộc</li>
                    <li className="page-key-item">Thời Đại Hồ Chí Minh</li>
                    <li className="page-key-item">Đối Ngoại</li>
                    <li className="page-key-item">Nguyễn Phú Trọng</li>
                    <li className="page-key-item">Kiển Định</li>
                    <li className="page-key-item">Sọi Chỉ Đỏ</li>
                    <li className="page-key-item">Bất Biến</li>
                    <li className="page-key-item">Đối Nội</li>
                    <li className="page-key-item">Hòa Hiếu</li>
                    <li className="page-key-item">Kiên Cường</li>
                    <li className="page-key-item">Linh Hoạt</li>
                    <li className="page-key-item">Mềm Mại</li>
                    <li className="page-key-item">Thường Trực Ban Bí Thư</li>
                    <li className="page-key-item">Tổng Lãnh Sự Việt Nam</li>
                  </ul>
                </div>
              </div>
              <p className="page-source">
                Nguồn <span className="page-source-name">{data?.publisher?.name}</span>
                {': '}
                <span className="page-source-link">{data?.sourceURL}</span>
              </p>
              <div className="page-news">
                <div className="page-news-header">
                  <p className="page-news-title">TIN KHÁC</p>
                  <div className="page-news-decor"></div>
                </div>
                <div className="page-news-content">
                  <BoxNews />
                  <BoxNews />
                  <BoxNews />
                </div>
              </div>
              <div className="page-news">
                <div className="page-news-header">
                  <p className="page-news-title">TIN NÓNG</p>
                  <div className="page-news-decor"></div>
                </div>
                <div className="page-news-content">
                  <BoxNews />
                  <BoxNews />
                  <BoxNews />
                </div>
              </div>
              <div className="page-news">
                <div className="page-news-header">
                  <p className="page-news-title">TIN MỚI</p>
                  <div className="page-news-decor"></div>
                </div>
                <div className="page-news-content">
                  <BoxNews />
                  <BoxNews />
                  <BoxNews />
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
  )
}
export default ReadingPage
