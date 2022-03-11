import React from 'react';
import { Modal, Form, FormInstance, Input, InputNumber, Button } from 'antd';
export interface AddModalProps<T extends object> {
  loading?: boolean;
  visible?: boolean;
  hideModal?: () => unknown;
  onSubmit?: (form: FormInstance<T>) => unknown;
  width?: number | string;
}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
function AddUserModalWithGeneric<T extends object>(
  props: React.PropsWithChildren<AddModalProps<T>>
) {
  const { children, loading, visible, hideModal, onSubmit, width } = props;
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Modal
      visible={visible}
      title={'Tạo tài khoản User'}
      okText="Create"
      cancelText="Cancel"
      //   destroyOnClose
      confirmLoading={loading}
      onCancel={hideModal}
      //   onOk={() => onSubmit(form)}
      width={width}
    >
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['user', 'name']}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          label="Email"
          rules={[{ type: 'email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'age']}
          label="Age"
          rules={[{ type: 'number', min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={['user', 'website']} label="Website">
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label="Introduction">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export const AddUserModal = React.memo(
  AddUserModalWithGeneric
) as typeof AddUserModalWithGeneric;
