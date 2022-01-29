import React from 'react'
import { Outlet } from 'react-router-dom'

export const BlankLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}
