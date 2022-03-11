/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ProTable, ProTableColumns } from '../../../components/ProTable';
import { RegisterParameter, User } from '@kma-news/api-interface';
import Tag from 'antd/lib/tag';
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'apps/admin/src/app/hooks';
import {
  selectUser,
  getAllUserAction,
  deleteUserAction,
  createUserAction,
  selectMessage,
} from '@kma-news/user-slice';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Popconfirm,
  Select,
  Space,
  Table,
} from 'antd';
import {
  FrownOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { registerAction } from '@kma-news/auth-slice';
import { CreateUser } from 'libs/api-interface/src/user/user.interface';
import { Option } from 'antd/lib/mentions';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
    password: '',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
type Role = 'admin' | 'user';

const ManagerUser: React.FC = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const notifi = useAppSelector(selectMessage);
  const users = useAppSelector(selectUser);
  const [reload, setReLoad] = useState(true);
  const onFinish = (values: any) => {
    const result = users.find((e) => e.email == values.user.email);
    if (result) {
      notification.open({
        message: 'Email này đã tồn tại',
        icon: <FrownOutlined style={{ color: '#E74C3C' }} />,
      });
    } else {
      dispatch(createUserAction({ ...values.user, avatarURL: '' }));

      notification.open({
        message: 'Đăng kí thành công',
        icon: <SmileOutlined style={{ color: '#2ECC71' }} />,
      });
      // setReLoad(!reload);

      setVisible(false);
    }
    updateUsers();
  };
  const updateUsers = () => dispatch(getAllUserAction());
  const onDelete = (id: number) => {
    dispatch(deleteUserAction(id));
    notification.open({
      message: 'Xóa thành công',
      icon: <SmileOutlined style={{ color: '#2ECC71' }} />,
    });
    updateUsers();
    setReLoad(!reload);
  };
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
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record) => {
        return (
          <Space size="small">
            {/* <Button
                type="link"
                color="primary"
                onClick={() => toggleEdit && toggleEdit(record.id)}
              >
                Edit
              </Button> */}
            <Popconfirm
              title="Bạn có chắc muốn xóa bản ghi này?"
              onConfirm={() => onDelete && onDelete(record.id)}
              onCancel={undefined}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getAllUserAction());
  }, []);
  return (
    <div>
      <div
        style={{
          background: '#ffff',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
      >
        <div
          style={{
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h3>{'Bảng thông tin các tài khoản'}</h3>
          <div>
            <Button type="primary" onClick={() => setVisible(true)}>
              <PlusOutlined />
              Thêm mới
            </Button>
            <Button type="text">
              <ReloadOutlined />
            </Button>
            <Modal
              visible={visible}
              title={'Tạo tài khoản User'}
              okText="Create"
              cancelText="Cancel"
              destroyOnClose
              //   confirmLoading={loading}
              onCancel={() => setVisible(false)}
              //   onOk={() => onSubmit(form)}
              // width={auto}
            >
              <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name={['user', 'name']}
                  label="Tên"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={['user', 'email']}
                  label="Email"
                  rules={[
                    { type: 'email' },
                    { required: true, message: 'Please input your  email' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={['user', 'password']}
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name={['user', 'role']}
                  label="Role"
                  rules={[{ required: true, message: 'Role is required' }]}
                >
                  <Select placeholder="Select role">
                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                  </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            <Button type="text">
              <SettingOutlined />
            </Button>
          </div>
        </div>
        <Table columns={columns} dataSource={users} rowKey="_id" />
      </div>
    </div>
  );
};
export default ManagerUser;
