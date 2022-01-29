import React from 'react'
import { useAppSelector } from '@/app/hooks'
import { selectHeaderCategory } from '@/features/Option/optionSlice'
import { CategoryGroup } from '@/features/Category/components/CategoryGroup'

export const HeaderCategory: React.FC = () => {
  const headerCategories = useAppSelector(selectHeaderCategory)
  return (
    <ul className="col-9 drop-menu-list">
      {headerCategories.map((e, i) => (
        <CategoryGroup title={e.title} url={e.url} subItems={e.subItems} key={`tree-group-${i}`} />
      ))}
    </ul>
  )
}
