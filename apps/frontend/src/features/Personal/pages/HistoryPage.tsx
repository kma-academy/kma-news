import React from 'react'
import { BsTrash } from 'react-icons/bs'
import BoxRecent from '@/components/BoxRecent'

const HistoryPage = () => {
  return (
    <div>
      <div className="user-page__header">
        <div className="user-page__title">Đọc gần đây</div>
        <div className="user-page__remove-all">
          <BsTrash className="user-page__remove-all__icon" />
          <div className="user-page__remove-all__text">Xóa tất cả</div>
        </div>
      </div>
      <div className="user-page__body">
        <BoxRecent />
        <BoxRecent />
        <BoxRecent />
      </div>
    </div>
  )
}
export default HistoryPage
