import React from 'react'
import BoxOffer from '@/components/BoxOffer'

const SuggestPage = () => {
  return (
    <div>
      <div className="user-page__header">
        <div className="user-page__title">Đề xuất</div>
      </div>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <BoxOffer key={`suggest-page-${i}`} />
        ))}
    </div>
  )
}
export default SuggestPage
