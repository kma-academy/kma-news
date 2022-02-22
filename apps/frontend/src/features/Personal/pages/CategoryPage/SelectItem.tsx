// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useAppSelector } from '@/app/hooks';
import { CategoryType } from '@kma-news/api-interface';
import { selectCategory } from '@kma-news/channel-slice';
import React from 'react';

export interface ItemData {
  type: 'keyword' | 'publisher' | 'category';
  data: string | CategoryType;
}

export interface SelectItemProps {
  onSelected: (item: ItemData) => void;
  keyword: string;
}
export const SelectItem: React.FC<SelectItemProps> = ({
  onSelected,
  keyword,
}) => {
  const categories = useAppSelector(selectCategory);
  return (
    <div className="drop-table">
      {keyword && (
        <div>
          <div className="title-drop">Từ khoá :</div>
          <div
            className="item-drop"
            onClick={(e) =>
              onSelected({
                type: 'keyword',
                data: keyword,
              })
            }
          >
            <span>{keyword}</span>
          </div>
        </div>
      )}
      <div>
        <div className="title-drop">Nguồn báo :</div>
        <div className="item-drop">
          <span>Bao Moi</span>
        </div>
      </div>
      {categories.length > 0 && (
        <div>
          <div className="title-drop">Chuyên mục :</div>
          {categories.map((e, i) => (
            <div
              className="item-drop"
              key={i}
              onClick={(evt) =>
                onSelected({
                  type: 'category',
                  data: e,
                })
              }
            >
              <span>{e.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
