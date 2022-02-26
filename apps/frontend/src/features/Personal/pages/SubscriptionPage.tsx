import React, { useEffect } from 'react';
import BoxFollow from '@/components/BoxFollow';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  getListReactPostAction,
  selectListReact,
} from '@kma-news/react-post-slice';

const SubscriptionPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectListReact);
  useEffect(() => {
    dispatch(getListReactPostAction());
  }, [dispatch]);
  return (
    <div>
      <div className="user-page__header">
        <div className="user-page__title">Danh sách theo dõi báo</div>
      </div>
      {data.length > 0 && (
        <div className="user-page__body">
          {data.map((e, i) => (
            <BoxFollow data={e} key={i} />
          ))}
        </div>
      )}
    </div>
  );
};
export default SubscriptionPage;
