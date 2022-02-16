import { ProTable, ProTableColumns } from '../../../components/ProTable';
import { User } from '@kma-news/api-interface';
import Tag from 'antd/lib/tag';
import React from 'react';
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
  return (
    <div>
      <ProTable<User>
        columns={columns}
        items={[]}
        tableName="Quản lý người dùng"
      ></ProTable>
    </div>
  );
};

export default ManagerUserPage;
