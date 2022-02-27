/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useAppDispatch } from '@/app/hooks';
import { environment } from '@/environments/environment.prod';
import createZaloLoginUrl from '@/services/createZaloLoginUrl';
import { registerAction } from '@kma-news/auth-slice';
import React, { useRef, useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export interface Props {
  close: (isLoggin: boolean) => void;
}
const Regis: React.FC<Props> = (props) => {
  const { zaloCallbackURL, zaloAppId } = environment;
  const passRef = useRef<HTMLInputElement>(null);
  const validatePassRef = useRef<HTMLInputElement>(null);
  const [showMessage, setShowMessage] = useState(false);
  const { close } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [switchColor, setSwitchColor] = useState(false);
  const [seePass, setSeePass] = useState(false);
  const [seeValiPass, setSeeValiPass] = useState(false);
  const [message, setMessage] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useAppDispatch();
  const getRandomImageUrl = () => {
    const randomId = Math.trunc(Math.random() * 2000);
    return `https://placedog.net/500/500/?id=${randomId}`;
  };
  const checkPass = () => {
    if (passRef.current?.value != validatePassRef.current?.value) {
      setShowMessage(true);
      setSwitchColor(false);
      setMessage('Mật khẩu không trùng khớp');
    } else {
      setShowMessage(false);
      setMessage('Mật khẩu trùng khớp');
      setSwitchColor(true);
    }
  };
  const handleRandomPhotoClick = () => {
    setUrl(getRandomImageUrl());
  };
  // const handleLoginZalo = (event: MouseEvent) => {
  //   event.preventDefault();
  //   if (zaloAppId && zaloCallbackURL) {
  //     const popupLogin = window.open(
  //       createZaloLoginUrl(zaloAppId, zaloCallbackURL),
  //       'popup',
  //       'width=600,height=600'
  //     );
  //   }
  // };
  const handleSubmit = () => {
    if (validatePassRef.current?.value === '' && switchColor === false) {
      if (
        validatePassRef.current?.value === '' &&
        passRef.current?.value === ''
      )
        toast.error('Không được để trống mật khẩu');
      else if (switchColor === false) toast.error('Mật khẩu không khớp');
    } else {
      toast.success('Đăng kí thành công');
      dispatch(
        registerAction({
          email: email,
          password: password,
          name: name,
          avatarURL: url,
        })
      );
    }
  };
  return (
    <div className="auth-form">
      <div className="auth-form__header">
        <p className="auth-form__title">Đăng kí</p>
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-form__group">
            <input
              type="text"
              className="auth-form__group-input "
              placeholder="Nhập tên của bạn"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="auth-form__group--pass">
            <input
              ref={passRef}
              type={seePass ? 'text' : 'password'}
              className="auth-form__group-input "
              placeholder="Nhập mật khẩu của bạn"
            />
            <div
              className="auth-form__eye"
              onClick={() => setSeePass(!seePass)}
            >
              {seePass ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </div>
          </div>
          <div className="auth-form__group--pass">
            <input
              ref={validatePassRef}
              type={seeValiPass ? 'text' : 'password'}
              className="auth-form__group-input "
              placeholder="Xác thực mật khẩu"
              onChange={(e) => {
                checkPass();
                setPassword(e.target.value);
              }}
            />
            <div
              className="auth-form__eye"
              onClick={() => setSeeValiPass(!seeValiPass)}
            >
              {seeValiPass ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </div>
          </div>
          <p
            className={
              switchColor
                ? 'auth-form__group-message--true'
                : 'auth-form__group-message--false'
            }
          >
            {message}
          </p>
          {/* <p className="auth-form__group-forget">Bạn quên mật khẩu ?</p> */}
        </div>
        <div className="extension">
          <div className="random-photo">
            <div className="random-photo__button">
              <input
                type="button"
                // onBlur={onRandomButtonBlur}
                onClick={handleRandomPhotoClick}
                value="Random avatar"
              />
            </div>

            <div className="random-photo__photo">
              {url && (
                <img
                  src={url}
                  alt="Ooops ... not found. Please click random again!"
                  onError={handleRandomPhotoClick}
                />
              )}
            </div>
          </div>
          <div className="auth-form__btn">
            <input
              type="button"
              className="auth-btn auth-btn--regis"
              value="Đăng kí"
              onClick={handleSubmit}
            />
            <input
              type="button"
              className="auth-btn auth-btn--login"
              value="Đăng nhập"
              onClick={() => close(true)}
            />
          </div>
        </div>
      </form>
      <div className="auth-form__socials">
        <a
          href="#"
          className="auth-socials__btn auth-socials__btn--zalo"
          // onClick={(event) => handleLoginZalo}
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
        <a href="/#" className="auth-socials__btn auth-socials__btn--face">
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
  );
};
export default Regis;
