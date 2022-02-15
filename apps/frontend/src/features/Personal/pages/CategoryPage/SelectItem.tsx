import React from 'react';

export interface ItemData {
  type: 'keyword' | 'publisher' | 'category';
  content: string;
}

export interface SelectItemProps {
  onSelected: (item: ItemData) => void;
  keyword: string;
}
export const SelectItem: React.FC<SelectItemProps> = ({
  onSelected,
  keyword,
}) => {
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
                content: keyword,
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
          <span>Alo</span>
        </div>
      </div>
      <div>
        <div className="title-drop">Chuyên mục :</div>
        <div className="item-drop">
          <span>Hình sự - Dân sự</span>
        </div>
        <div className="item-drop">
          <span>Bóng đá quốc tế</span>
        </div>
      </div>
    </div>
  );
};
