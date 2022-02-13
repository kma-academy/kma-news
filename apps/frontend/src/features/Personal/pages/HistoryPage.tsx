import React, { useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import BoxRecent from '@/components/BoxRecent';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectHistory,
  getUserHistoryAction,
  deleteHistoryAction,
} from '@kma-news/history-slice';

const HistoryPage = () => {
  const histories = useAppSelector(selectHistory);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserHistoryAction());
  }, [dispatch]);
  return (
    <div>
      <div className="user-page__header">
        <div className="user-page__title">Đọc gần đây</div>
        <div className="user-page__remove-all">
          <BsTrash className="user-page__remove-all__icon" />
          <div className="user-page__remove-all__text">Xóa tất cả</div>
        </div>
      </div>
      <div className="user-page__body">
        {histories.map((e, i) => {
          return (
            <BoxRecent
              thumbnailURL={e.post?.thumbnailURL}
              title={e.post?.title}
              url={e.post?.url}
              visitDate={e.visitDate}
              key={i}
              onDelete={() => dispatch(deleteHistoryAction(e.id))}
            />
          );
        })}
      </div>
    </div>
  );
};
export default HistoryPage;
