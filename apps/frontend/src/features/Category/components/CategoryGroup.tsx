import React from 'react'
import { Link } from 'react-router-dom'
export interface CategoryGroupItemProps {
  url: string
}

export const CategoryGroupItem: React.FC<CategoryGroupItemProps> = (props) => {
  return (
    <Link to={props.url}>
      <li className="menu-sub-item">{props.children}</li>
    </Link>
  )
}

export interface CategoryGroupProps {
  title: string
  url: string
  subItems?: Omit<CategoryGroupProps, 'subItems'>[]
}

export const CategoryGroup: React.FC<CategoryGroupProps> = React.memo(({ title, subItems }) => {
  if (!subItems || subItems.length === 0) subItems = [{ title: '', url: '' }]
  return (
    <li className="drop-menu-item">
      <div className="menu-item-title">
        <Link to="/">{title}</Link>
      </div>
      <ul className="drop-menu-sub-list">
        {subItems.map((e, i) => (
          <CategoryGroupItem key={`category-${title}-${i}`} url={e.url}>
            {e.title}
          </CategoryGroupItem>
        ))}
      </ul>
    </li>
  )
})
