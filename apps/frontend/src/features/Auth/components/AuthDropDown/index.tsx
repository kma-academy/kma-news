import React from 'react'
import { useAppDispatch } from '@/app/hooks'
import { BsSave2 } from 'react-icons/bs'
import { GiRibbonMedal, GiBackwardTime } from 'react-icons/gi'
import { IoMdExit } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { logoutAction } from '@/features/Auth/authSlice'
import './index.css'
export interface AuthDropDownProps {
  visible: boolean
  toggleVisible: (visible: boolean) => void
}

export const AuthDropDown: React.FC<AuthDropDownProps> = (props) => {
  const dispatch = useAppDispatch()
  const { visible } = props
  return (
    <div className={visible ? 'auth-drop' : 'auth-drop--hide'}>
      <ul className="auth-drop__list">
        <Link to="/ca-nhan/de-xuat" className="auth-drop__item">
          <GiRibbonMedal className="auth-drop__icon" />
          <li>
            <div className="auth-drop__item--a">Tin đề xuất</div>
          </li>
        </Link>
        <Link to="/ca-nhan/doc-gan-day" className="auth-drop__item">
          <li>
            <div className="auth-drop__item--a">
              <GiBackwardTime className="auth-drop__icon" />
              Đọc gần đây
            </div>
          </li>
        </Link>
        <Link to="/ca-nhan/tin-da-luu" className="auth-drop__item">
          <li>
            <div className="auth-drop__item--a">
              <BsSave2 className="auth-drop__icon" />
              Tin đã lưu
            </div>
          </li>
        </Link>
        <Link to="#" className="auth-drop__item" onClick={() => dispatch(logoutAction())}>
          <li>
            <div className="auth-drop__item--a">
              <IoMdExit className="auth-drop__icon" />
              Đăng xuất
            </div>
          </li>
        </Link>
      </ul>
    </div>
  )
}
