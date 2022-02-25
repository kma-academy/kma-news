/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React, { useEffect } from 'react';
import { AiOutlineUser, AiOutlineMenu } from 'react-icons/ai';
import { BsPhone, BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Login from '@/features/Auth/components/Login';
import { AuthDropDown } from '@/features/Auth/components/AuthDropDown/';
import {
  selectLoggedIn,
  selectProfile,
  togglePopup,
} from '@kma-news/auth-slice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useClickOutside } from '@/hooks/useClickOutside';
import useClickInside from '@/hooks/useClickInside';
import { HeaderMenu } from './HeaderMenu';
import { HeaderTag } from './HeaderTag';
import {
  getHeaderCategoriesAction,
  getHeaderMenusAction,
  getHeaderTagsAction,
} from '@/features/Option/optionSlice';
import { HeaderCategory } from './HeaderCategory';
import { SearchBox } from '../SearchBox';

const Header = () => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(selectLoggedIn);
  const profile = useAppSelector(selectProfile);
  const [refUser, userMenuVisible, toggleUserMenu] =
    useClickOutside<HTMLDivElement>(false);
  const [refDropMenu, activeDropMenu, setActiveDropMenu] =
    useClickOutside<HTMLDivElement>(false);

  useEffect(() => {
    // Nếu đăng nhập thành công
    if (loggedIn) {
      toggleUserMenu(false);
    }
  }, [loggedIn, toggleUserMenu]);
  useEffect(() => {
    dispatch(getHeaderMenusAction());
    dispatch(getHeaderCategoriesAction());
    dispatch(getHeaderTagsAction());
  }, []);
  // const domNode = useClickOutside(() => {
  //   toggleUserMenu(false)
  // })
  return (
    <div className="header">
      <div className="col-9 header-top">
        <div className="header-top-left">
          <div className="logo">
            <Link to="/">
              <div className="logo-main">
                <span>
                  BAOM
                  <img
                    src="https://baomoi-static.zadn.vn/favicons/favicon-32x32.png"
                    alt="logo"
                  />
                  I
                </span>
              </div>
            </Link>
            <span className="logo-description">trang thông tin điện tử</span>
          </div>
          <SearchBox />
        </div>
        <div className="header-top-right">
          {profile ? (
            <div ref={refUser}>
              <div
                className="header-top__user"
                onClick={() => toggleUserMenu(!userMenuVisible)}
              >
                <img
                  src={profile.avatarURL || 'https://i.pravatar.cc/800'}
                  alt=""
                  className="header-top__image"
                />
                <div className="header-top__user-name">{profile.name}</div>
              </div>
              <div>
                <AuthDropDown
                  visible={userMenuVisible}
                  toggleVisible={toggleUserMenu}
                />
              </div>
            </div>
          ) : (
            <div>
              <div
                className="logo-user"
                onClick={() => dispatch(togglePopup(true))}
              >
                <AiOutlineUser size="25px" />
              </div>
              <Login />
            </div>
          )}

          <a href="#!">
            <BsPhone size="25px" className="header-icon header-icon--phone" />
          </a>
        </div>
      </div>
      <div className="header-body">
        <div className="col-9 header-navbar">
          <ul className="header-navbar-list">
            <HeaderMenu />
            <HeaderTag />
            <li
              className="header-navbar-item-menu"
              onClick={() => setActiveDropMenu(!activeDropMenu)}
            >
              <div className="header-navbar-item-menu-icon">
                <AiOutlineMenu className="header-menu-icon" />
              </div>
            </li>
          </ul>
        </div>
        <div
          ref={refDropMenu}
          onClick={() => setActiveDropMenu(!activeDropMenu)}
        >
          <div
            className="drop-menu"
            style={
              activeDropMenu ? { visibility: 'visible', opacity: '1' } : {}
            }
          >
            <HeaderCategory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
