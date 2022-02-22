/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import BoxNews from '@/components/BoxNews';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPostOther,
  getPostsOtherAction,
} from '@kma-news/posts-other-slice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
export const PostOther = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectPostOther);
  useEffect(() => {
    dispatch(getPostsOtherAction({ limit: 3, page: 1 }));
  }, [dispatch]);
  return (
    <div className="page-news">
      <div className="page-news-header">
        <p className="page-news-title">TIN KHÁC</p>
        <div className="page-news-decor"></div>
      </div>
      <div className="page-news-content">
        {data.map((e, i) => (
          <BoxNews {...e} key={i} />
        ))}
      </div>
    </div>
  );
};
