import React from 'react'
import Spin from 'antd/lib/spin'

export const LoadingGlobal = () => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <Spin size="large" />
    </div>
  )
}
