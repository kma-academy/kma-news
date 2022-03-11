/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ProTable, ProTableColumns } from '../../../components/ProTable';
import { User } from '@kma-news/api-interface';
import Tag from 'antd/lib/tag';
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'apps/admin/src/app/hooks';
import {
  selectUser,
  getAllUserAction,
  deleteUserAction,
} from '@kma-news/user-slice';
const columns: ProTableColumns<User> = [
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Họ tên',
  },
  {
    key: 'email',
    dataIndex: 'email',
    title: 'Email',
  },
  {
    key: 'role',
    dataIndex: 'role',
    title: 'Chức năng',
    render: (value: string) => {
      return <Tag color="lime">{value}</Tag>;
    },
  },
];
const ManagerUserPage: React.FC = () => {
  console.log('table');
  const dispatch = useAppDispatch();
  // dispatch(getAllUserAction());
  useEffect(() => {
    dispatch(getAllUserAction());
  });
  const users = useAppSelector(selectUser);
  const onDelete = (id: number) => {
    dispatch(deleteUserAction(id));
  };
  console.log(users);

  return (
    <div>
      <ProTable<User>
        columns={columns}
        items={users}
        tableName="Quản lý người dùng"
        onDelete={onDelete}
      ></ProTable>
    </div>
  );
};

export default ManagerUserPage;
