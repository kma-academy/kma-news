/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React, { useEffect } from 'react';
import Header from '@/components/Header/';
import Footer from '@/components/Footer/';
import { Outlet } from 'react-router-dom';
import { profileAction } from '@kma-news/auth-slice';
import { useAppDispatch } from '@/app/hooks';

export const BasicLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(profileAction());
  }, [dispatch]);
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
