import React from 'react'
import Tag from 'antd/lib/tag'
import Input from 'antd/lib/input'
import { PlusOutlined } from '@ant-design/icons'
import './index.css'
export interface EditableTagProps {
  inputRef: React.RefObject<Input>
  isEditting: boolean
  toggleAdd: () => void
  handleSubmit: () => void
}
export const AddTag: React.FC<EditableTagProps> = (props) => {
  const { inputRef, isEditting, children, toggleAdd, handleSubmit } = props
  if (isEditting)
    return (
      <Input
        ref={inputRef}
        onBlur={handleSubmit}
        onPressEnter={handleSubmit}
        className="editable-tag-input"
        size="small"
      />
    )
  return (
    <Tag onClick={toggleAdd} className="editable-tag-plus">
      <PlusOutlined /> {children}
    </Tag>
  )
}
