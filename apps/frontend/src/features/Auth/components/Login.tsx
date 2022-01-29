import React, { useState, MouseEvent } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { loginAction } from '../authSlice'
import './auth.css'
import createZaloLoginUrl from '@/services/createZaloLoginUrl'
export interface LoginPopupProps {
  visible: boolean
  toggleVisible: (visible: boolean) => void
}
const { REACT_APP_ZALO_CALLBACK_URL = '', REACT_APP_ZALO_APP_ID = '' } = process.env
const Login: React.FC<LoginPopupProps> = React.memo((props) => {
  const dispatch = useAppDispatch()
  const { visible, toggleVisible } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = () => {
    dispatch(loginAction({ email, password }))
  }
  const handleLoginZalo = (event: MouseEvent) => {
    event.preventDefault()
    const popupLogin = window.open(
      createZaloLoginUrl(REACT_APP_ZALO_APP_ID, REACT_APP_ZALO_CALLBACK_URL),
      'popup',
      'width=600,height=600'
    )
  }

  return (
    <div className={visible ? 'modal' : 'modal-none'} id="modal">
      <div className="modal__overlay" onClick={() => toggleVisible(false)} />
      <div className="modal__body">
        <div className="auth-form">
          <div className="auth-form__header">
            <p className="auth-form__title">Đăng nhập</p>
            <img
              src="https://baomoi.com/images/default-skin/bm-logo.png"
              alt="logo"
              className="auth-form__logo"
            />
          </div>

          <form action="" method="POST">
            <div className="auth-form__form">
              <div className="auth-form__group">
                <input
                  type="text"
                  className="auth-form__group-input "
                  placeholder="Nhập email tài khoản của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="auth-form__group">
                <input
                  type="password"
                  className="auth-form__group-input "
                  placeholder="Nhập mật khẩu của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="auth-form__group-forget">Bạn quên mật khẩu ?</p>
            </div>
            <div className="auth-form__btn">
              <input type="button" className="auth-btn auth-btn--regis" value="Đăng kí" />
              <input
                type="button"
                className="auth-btn auth-btn--login"
                value="Đăng nhập"
                onClick={handleSubmit}
              />
            </div>
          </form>
          <div className="auth-form__socials">
            <a
              href="/#"
              className="auth-socials__btn auth-socials__btn--zalo"
              onClick={handleLoginZalo}
            >
              <img
                src="https://page.widget.zalo.me/static/images/2.0/Logo.svg"
                alt=""
                className="auth-socails__logo"
              />
              <p className="auth-socials__name auth-socials__name--zalo">Đăng nhập bằng Zalo</p>
            </a>
            <a href="/#" className="auth-socials__btn auth-socials__btn--face">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
                alt=""
                className="auth-socails__logo"
              />
              <p className="auth-socials__name auth-socials__name--face">Đăng nhập bằng Facebook</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
})
export default Login
