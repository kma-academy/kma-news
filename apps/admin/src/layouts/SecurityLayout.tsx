import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  profileAction,
  selectProfile,
  selectLoading,
  selectLoggedIn,
} from '@kma-news/auth-slice';
import Result from 'antd/lib/result';
import Button from 'antd/lib/button';
import { BasicLayout } from './BasicLayout';

export const SecurityLayout: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector(selectProfile);
  const loadingProfile = useAppSelector(selectLoading);
  const loggedIn = useAppSelector(selectLoggedIn);
  const redirect_url = window.location.pathname;
  useEffect(() => {
    dispatch(profileAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loadingProfile === 'error' || !loggedIn) {
      navigate('/auth/login', {
        state: {
          redirect_url,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingProfile, loggedIn, navigate]);
  if (profile?.role === 'user')
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary">Logout</Button>}
      />
    );
  if (!profile) return null;
  return <BasicLayout />;
};
