import React, { Suspense } from 'react';
import { Button, Result } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LoadingGlobal } from '../components/LoadingGlobal';
import { BlankLayout } from '../layouts/BlankLayout';
import { SecurityLayout } from '../layouts/SecurityLayout';
const LoginPage = React.lazy(() => import('../features/Auth/pages/LoginPage'));
const UserManager = React.lazy(
  () => import('../features/User/pages/ManagerUserPage')
);
// const CategoryManager = React.lazy(() => import('@/features/Category/pages/CategoryManager'))
// const HeaderOptionPage = React.lazy(() => import('@/features/Option/pages/HeaderOptionPage'))
export const RootRoute = () => {
  return (
    <Suspense fallback={<LoadingGlobal />}>
      <Routes>
        <Route path="/admin" element={<SecurityLayout />}>
          <Route path="users" element={<UserManager />} />
          {/* <Route path="categories" element={<CategoryManager />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/options" element={<SecurityLayout />}>
          {/* <Route path="header" element={<HeaderOptionPage />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/auth" element={<BlankLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/" element={<SecurityLayout />} />
      </Routes>
    </Suspense>
  );
};

function NotFound() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      }
    />
  );
}
