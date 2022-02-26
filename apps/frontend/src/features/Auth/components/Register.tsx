/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useAppDispatch } from '@/app/hooks';
import { createUserAction } from '@kma-news/auth-slice';
import React, { createRef, useRef, useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export interface Props {
  close: (isLoggin: boolean) => void;
}
const Regis: React.FC<Props> = (props) => {
  const passRef = useRef<HTMLInputElement>(null);
  const validatePassRef = useRef<HTMLInputElement>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [switchColor, setSwitchColor] = useState(false);
  const [seePass, setSeePass] = useState(false);
  const [seeValiPass, setSeeValiPass] = useState(false);
  const [message, setMessage] = useState('');
  const { close } = props;
  const dispatch = useAppDispatch();
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
  const handleSubmit = () => {
    if (validatePassRef.current?.value == '' && switchColor == false) {
      if (validatePassRef.current?.value == '' && passRef.current?.value == '')
        toast.error('Không được để trống mật khẩu');
      else if (switchColor == false) toast.error('Mật khẩu không khớp');
    } else {
      toast.success('Đăng kí thành công');
      dispatch(createUserAction({ email: email, password: password }));
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
        <div className="auth-form__btn">
          <input
            type="button"
            className="auth-btn"
            value="Đăng kí"
            onClick={handleSubmit}
          />
          {/* <input
            type="button"
            className="auth-btn"
            value="Đăng nhập"
            onClick={() => close(true)}
          /> */}
        </div>
      </form>
      <div className="auth-form__socials">
        <a href="/#" className="auth-socials__btn">
          <img
            src="https://page.widget.zalo.me/static/images/2.0/Logo.svg"
            alt=""
            className="auth-socails__logo"
          />
          <p className="auth-socials__name">Đăng nhập bằng Zalo</p>
        </a>
        <a href="/#" className="auth-socials__btn">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
            alt=""
            className="auth-socails__logo"
          />
          <p className="auth-socials__name">Đăng nhập bằng Zalo</p>
        </a>
      </div>
    </div>
  );
};
export default Regis;
