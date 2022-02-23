/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectChannel,
  getPersonalChannelAction,
  deletePersonalChannelAction,
} from '@kma-news/channel-slice';
import React, { useEffect, useState } from 'react';
import { GiTrashCan } from 'react-icons/gi';
import { HiOutlineDotsHorizontal, HiOutlinePencilAlt } from 'react-icons/hi';
import { Link } from 'react-router-dom';
function CategoryPageMain() {
  const channels = useAppSelector(selectChannel);
  const dispatch = useAppDispatch();
  const [dropItem, setDropItem] = useState(-1);
  const btnDropItem = (id: number) => {
    if (id === dropItem) {
      setDropItem(-1);
    } else {
      let selectItem = channels.filter((e) => e.id === id);
      setDropItem(selectItem[0].id);
    }
  };
  const btnDelChannel = (idChannel: number) => {
    dispatch(deletePersonalChannelAction(idChannel));
  };
  useEffect(() => {
    dispatch(getPersonalChannelAction());
  }, [dispatch, btnDropItem]);
  if (channels.length > 0)
    return (
      <div className="category-page-main">
        <div className="header-category-page-main">
          <h3>Tin tức tùy chọn</h3>
          <Link className="btn create-category" to={'tao-moi'}>
            Tạo mục
          </Link>
        </div>
        <div className="list-category-page-main col-12">
          {channels.map((e, i) => (
            <div className="item-category-page-main" key={i}>
              <div className="item-img">
                <img
                  src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2022_02_16_119_41775537/da0037feadbc44e21dad.jpg"
                  alt=""
                />
              </div>
              <div className="item-name">{e.name}</div>
              <div className="btn-item" onClick={() => btnDropItem(e.id)}>
                <HiOutlineDotsHorizontal />
                {dropItem === e.id && (
                  <div className="item-category-drop">
                    <div className="update-category">
                      <HiOutlinePencilAlt size="20px" />
                      <span>Sửa</span>
                    </div>
                    <div
                      className="remove-category"
                      onClick={() => btnDelChannel(dropItem)}
                    >
                      <GiTrashCan size="20px" />
                      <span>Xóa</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div className="category-page-main">
      <div className="notification">
        <div>
          Bạn chưa có mục riêng, hãy tạo mục để theo dõi những tin tức yêu thích
          và chia sẻ cùng bạn bè
        </div>
      </div>
      <div>
        <Link className="btn create-category" to={'tao-moi'}>
          Tạo mục
        </Link>
      </div>
    </div>
  );
}

export default CategoryPageMain;
