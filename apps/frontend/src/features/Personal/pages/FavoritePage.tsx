/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import BoxRecent from '@/components/BoxRecent';
import {
  deleteSavePostAction,
  getAllSavePostAction,
  selectAllSave,
} from '@kma-news/save-slice';
import React, { useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';

const FavoritePage = () => {
  const savePosts = useAppSelector(selectAllSave);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllSavePostAction());
  }, [dispatch]);
  return (
    <div>
      <div className="user-page__header">
        <div className="user-page__title">Bài đã lưu </div>
        <div className="user-page__remove-all">
          <BsTrash className="user-page__remove-all__icon" />
          <div className="user-page__remove-all__text">Xóa tất cả</div>
        </div>
      </div>
      <div className="user-page__body">
        {savePosts.map((e, i) => {
          return (
            <BoxRecent
              thumbnailURL={e.post?.thumbnailURL}
              title={e.post?.title}
              url={e.post?.url}
              visitDate={e.savedAt}
              key={i}
              onDelete={() => dispatch(deleteSavePostAction(e.id))}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FavoritePage;
