import React, { useState, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  loginAction,
  selectShowPopup,
  togglePopup,
} from '@kma-news/auth-slice';
import './auth.css';
import createZaloLoginUrl from '../../../services/createZaloLoginUrl';
import { environment } from '../../../environments/environment';
import Register from './Register';
import { ToastContainer } from 'react-toastify';
const { zaloCallbackURL, zaloAppId } = environment;
const Login: React.FC = React.memo((props) => {
  const dispatch = useAppDispatch();
  const isShowing = useAppSelector(selectShowPopup);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    dispatch(loginAction({ email, password }));
  };

  const [isLoggin, setIsLogin] = useState(true);
  const handleLoginZalo = (event: MouseEvent) => {
    event.preventDefault();
    const popupLogin = window.open(
      createZaloLoginUrl(zaloAppId, zaloCallbackURL),
      'popup',
      'width=600,height=600'
    );
  };

  return (
    <div className={isShowing ? 'modal' : 'modal-none'} id="modal">
      <div
        className="modal__overlay"
        onClick={() => dispatch(togglePopup(false))}
      ></div>
      <div className="modal__body">
        {isLoggin ? (
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
                <input
                  type="button"
                  className="auth-btn auth-btn--regis"
                  value="Đăng kí"
                  onClick={() => setIsLogin(false)}
                />
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
                href={createZaloLoginUrl(zaloAppId, zaloCallbackURL)}
                className="auth-socials__btn auth-socials__btn--zalo"
                onClick={handleLoginZalo}
              >
                <img
                  src="https://page.widget.zalo.me/static/images/2.0/Logo.svg"
                  alt=""
                  className="auth-socails__logo"
                />
                <p className="auth-socials__name auth-socials__name--zalo">
                  Đăng nhập bằng Zalo
                </p>
              </a>
              <a
                href="/#"
                className="auth-socials__btn auth-socials__btn--face"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
                  alt=""
                  className="auth-socails__logo"
                />
                <p className="auth-socials__name auth-socials__name--face">
                  Đăng nhập bằng Facebook
                </p>
              </a>
            </div>
          </div>
        ) : (
          <Register close={setIsLogin} />
        )}
      </div>
      <ToastContainer />
    </div>
  );
});
export default Login;
