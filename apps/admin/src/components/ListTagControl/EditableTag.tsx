import React from 'react'
import Tag from 'antd/lib/tag'
import Input from 'antd/lib/input'
import './index.css'

export interface EditableTagProps {
  inputRef: React.RefObject<Input>
  isEditting: boolean
  toggleEdit: () => void
  handleDelete: () => void
  handleSubmit: () => void
  children: string
}
export const EditableTag: React.FC<EditableTagProps> = (props) => {
  const { inputRef, isEditting, children, toggleEdit, handleDelete, handleSubmit } = props
  if (isEditting)
    return (
      <Input
        size="small"
        ref={inputRef}
        onBlur={handleSubmit}
        onPressEnter={handleSubmit}
        defaultValue={children}
        className="editable-tag-input"
      />
    )
  return (
    <Tag
      closable
      onClose={(e) => {
        e.preventDefault()
        handleDelete()
      }}
      className="editable-edit-tag"
    >
      <span onDoubleClick={toggleEdit}>{children}</span>
    </Tag>
  )
}
