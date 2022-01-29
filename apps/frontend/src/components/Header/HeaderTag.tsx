import { useAppSelector } from '@/app/hooks'
import { selectHeaderTag } from '@/features/Option/optionSlice'
import React from 'react'
import { Link } from 'react-router-dom'

export const HeaderTag: React.FC = () => {
  const headerTags = useAppSelector(selectHeaderTag)
  return (
    <>
      {headerTags.map((item, i) => (
        <Link to={item.path} key={`header-tag-${i}`}>
          <li className="header-navbar-item--hot">
            <div className="header-navbar-item--hotC">{item.name}</div>
          </li>
        </Link>
      ))}
    </>
  )
}
