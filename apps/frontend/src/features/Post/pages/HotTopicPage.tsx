import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
// import { BoxTopicHeader } from '../components/hotTopicPage/BoxTopicHeader'
import { BoxTopicItem } from '../components/HotTopic/BoxTopicItem'
import '../components/HotTopic/index.css'
export const HotTopicPage = () => {
  return (
    <>
      <div
        className="container "
        style={{
          background:
            'url(https://baomoi-static.zadn.vn/web/styles/img/events/top_328-3.jpg) center top no-repeat',
        }}
      >
        <div className="col-9 container-main">
          <div className="hotPage">
            <div className="hotPage-title">
              PHÒNG CHỐNG DỊCH COVID-19
              <AiOutlineStar className="hotPage-title__icon" />
            </div>
            {/* <div className="hotPage-header">
              <div className="hotPage-header-child">
                <BoxTopicHeader big={true} />
              </div>
              <div className="hotPage-header-child">
                <BoxTopicHeader big={false} />
                <BoxTopicHeader big={false} />
                <BoxTopicHeader big={false} />
                <BoxTopicHeader big={false} />
              </div>
            </div> */}
            <div className="hotPage-body">
              <BoxTopicItem />
              <BoxTopicItem />
              <BoxTopicItem />
              <BoxTopicItem />
              <BoxTopicItem />
              <BoxTopicItem />
              <BoxTopicItem />
              <BoxTopicItem />
              <BoxTopicItem />
              <BoxTopicItem />
              <BoxTopicItem />
              <BoxTopicItem />
              <BoxTopicItem />
            </div>
            <div className="hotPage-list"></div>
          </div>
        </div>
      </div>
    </>
  )
}
