import React, { useEffect, useRef, useState } from 'react'
import Input from 'antd/lib/input'
import { EditableTag } from './EditableTag'
import { AddTag } from './AddTag'

export interface ListTagControlProps {
  tags: string[]
  addMessage: string
  onChangeTags: (tags: string[]) => void
}
const ListTagControl: React.FC<ListTagControlProps> = (props) => {
  const { tags, addMessage, onChangeTags } = props
  const [edittingId, setEdittingId] = useState(-1)
  const [isAdding, setIsAdding] = useState(false)
  const addRef = useRef<Input>(null)
  const editRef = useRef<Input>(null)
  useEffect(() => {
    if (editRef.current && edittingId !== -1) {
      editRef.current.input.value = tags[edittingId]
      editRef.current.focus()
    }
  }, [edittingId, tags])

  useEffect(() => {
    if (addRef.current && isAdding) {
      addRef.current.input.value = ''
      addRef.current.focus()
    }
  }, [isAdding])

  const handleAdd = () => {
    const newTagName = addRef.current?.input.value || ''
    const newTag = newTagName.trim()
    if (!newTag) return
    const newTags = [...tags, newTag]
    setIsAdding(false)
    onChangeTags(newTags)
  }

  const handleEdit = (id: number) => {
    const newTagName = editRef.current?.input.value || ''
    const newTag = newTagName.trim()
    if (!newTag) return
    const newTags = tags.map((e, i) => (i === id ? newTag : e))
    setEdittingId(-1)
    onChangeTags(newTags)
  }

  const handleDelete = (id: number) => {
    const newTags = tags.filter((e, i) => i !== id)
    onChangeTags(newTags)
  }

  return (
    <>
      {tags.map((e, i) => (
        <EditableTag
          handleDelete={() => handleDelete(i)}
          inputRef={editRef}
          key={`tag-${e}`}
          handleSubmit={() => handleEdit(i)}
          isEditting={edittingId === i}
          toggleEdit={() => setEdittingId(i)}
        >
          {e}
        </EditableTag>
      ))}
      <AddTag
        inputRef={addRef}
        handleSubmit={() => handleAdd()}
        toggleAdd={() => setIsAdding(true)}
        isEditting={isAdding}
      >
        {addMessage}
      </AddTag>
    </>
  )
}

export default ListTagControl
