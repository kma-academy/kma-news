import React from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { BsFolder2Open } from 'react-icons/bs'
import { GiBackwardTime } from 'react-icons/gi'
import { RiMedalLine } from 'react-icons/ri'
import { MdSaveAlt } from 'react-icons/md'
import { BiExit } from 'react-icons/bi'
import './index.css'
import { Link, Outlet } from 'react-router-dom'
const PersonalPage = () => {
  return (
    <div className="container">
      <div className="col-9 container-main">
        <div className="content">
          <div className="col-3 content-user__left">
            <div className="user-background">
              <img
                src="https://media-cdn.laodong.vn/Storage/NewsPortal/2020/6/30/816260/Cho-1.jpg"
                alt=""
                className="user-background__image"
              />
              <span className="user-background__name">Trần Đức Cường</span>
            </div>
            <ul className="user-list">
              <Link to="/ca-nhan/de-xuat">
                <li className="user-item">
                  <RiMedalLine className="user-item__icon" />
                  <span className="user-item__title">Đề Xuất</span>
                </li>
              </Link>
              <Link to="/ca-nhan/muc-cua-ban">
                <li className="user-item">
                  <BsFolder2Open className="user-item__icon" />
                  <span className="user-item__title">Mục của bạn</span>
                </li>
              </Link>
              <Link to="/ca-nhan/theo-doi">
                <li className="user-item">
                  <AiOutlineLike className="user-item__icon" />
                  <span className="user-item__title">Theo dõi</span>
                </li>
              </Link>
              <Link to="/ca-nhan/doc-gan-day">
                <li className="user-item">
                  <GiBackwardTime className="user-item__icon" />
                  <span className="user-item__title">Đọc gần đây</span>
                </li>
              </Link>
              <Link to="/ca-nhan/muc-da-luu">
                <li className="user-item">
                  <MdSaveAlt className="user-item__icon" />
                  <span className="user-item__title">Đã lưu</span>
                </li>
              </Link>
              <li className="user-item">
                <BiExit className="user-item__icon" />
                <span className="user-item__title">Đăng xuất</span>
              </li>
            </ul>
          </div>
          <div className="col-9 content-user__right">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
export default PersonalPage
