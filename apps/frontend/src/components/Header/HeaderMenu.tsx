import { useAppSelector } from '@/app/hooks'
import { selectHeaderMenu } from '@/features/Option/optionSlice'
import React from 'react'
import { Link } from 'react-router-dom'

export const HeaderMenu: React.FC = () => {
  const headerMenu = useAppSelector(selectHeaderMenu)
  return (
    <>
      {headerMenu.map((item, i) => (
        <Link to={item.path} key={`header-menu-${i}`}>
          <li className="header-navbar-item">{item.name}</li>
        </Link>
      ))}
    </>
  )
}
