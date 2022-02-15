import React, { useMemo } from 'react';
import { Breadcrumb as ATDBreadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import siteMap from '../../constants/siteMap';

export const Breadcrumb = React.memo(() => {
  const location = useLocation();
  const paths = useMemo(() => {
    const paths = location.pathname.split('/');
    const sites = paths
      .map((_, i) => {
        const p = paths.slice(0, i + 1).join('/');
        return {
          title: siteMap[p],
          path: p || '/',
        } as const;
      })
      .filter((e) => !!e);
    return sites;
  }, [location]);

  return (
    <ATDBreadcrumb style={{ margin: '16px 0' }}>
      {paths.map((e) => (
        <ATDBreadcrumb.Item key={`breadcrumb-${e.path}`}>
          <Link to={e.path}>{e.title}</Link>
        </ATDBreadcrumb.Item>
      ))}
    </ATDBreadcrumb>
  );
});
