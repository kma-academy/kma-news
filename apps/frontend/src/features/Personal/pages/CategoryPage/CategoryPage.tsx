/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectChannel,
  getPersonalChannelAction,
} from '@kma-news/channel-slice';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
function CategoryPageMain() {
  const channels = useAppSelector(selectChannel);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPersonalChannelAction());
  }, [dispatch]);
  if (channels.length > 0)
    return (
      <>
        <div>Danh sách: </div>
        <div>
          {channels.map((e) => (
            <div>{e.name}</div>
          ))}
        </div>
      </>
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
