import React, { useMemo } from 'react';
import {
  TableColumnsType,
  Space,
  Form,
  Input,
  Button,
  Table,
  Popconfirm,
} from 'antd';
import {
  ReloadOutlined,
  SettingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
interface ObjectWithID {
  id: number;
}
export type ProTableColumns<T extends ObjectWithID> = TableColumnsType<T>;

export type ProTableDataSource<T extends object> = Array<T>;
interface ProTableProps<T extends ObjectWithID> {
  tableName: string;
  items: ProTableDataSource<T>;
  columns: TableColumnsType<T>;
  toggleAdd?: () => unknown;
  toggleEdit?: (id: number) => unknown;
  onDelete?: (id: number) => unknown;
}

export const ProTable = function <T extends ObjectWithID>(
  props: ProTableProps<T>
) {
  const { tableName, columns, items, toggleAdd, toggleEdit, onDelete } = props;
  const actionColumn: ProTableColumns<T> = useMemo(() => {
    return [
      {
        title: 'Action',
        key: 'action',
        render: (text: any, record) => {
          return (
            <Space size="small">
              <Button
                type="link"
                color="primary"
                onClick={() => toggleEdit && toggleEdit(record.id)}
              >
                Edit
              </Button>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fullColumn = columns.concat(actionColumn);
  return (
    <div>
      {/* <div
        style={{
          background: '#FFF',
          padding: '24px 24px 12px',
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          justifyItems: 'center',
        }}
      >
        <Form layout="inline">
          <Form.Item name="Alo" label="Input">
            <Input />
          </Form.Item>
        </Form>
        <Space style={{ alignSelf: 'flex-end' }}>
          <Button type="default">Reset</Button>
          <Button type="primary">Query</Button>
          <Button type="link">Expland</Button>
        </Space>
      </div> */}
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
          <h3>{tableName}</h3>
          <div>
            <Button type="primary" onClick={toggleAdd}>
              <PlusOutlined />
              Thêm mới
            </Button>
            <Button type="text">
              <ReloadOutlined />
            </Button>
            <Button type="text">
              <SettingOutlined />
            </Button>
          </div>
        </div>
        <Table<T> columns={fullColumn} dataSource={items} rowKey="_id" />
      </div>
    </div>
  );
};
