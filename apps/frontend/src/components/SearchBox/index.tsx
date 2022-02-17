import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { searchPostAction, selectSearchResult } from '@kma-news/search-slice';
import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export const SearchBox: React.FC = () => {
  const [text, setText] = useState('');
  const [showResult, toggleResult] = useState(false);
  const posts = useAppSelector(selectSearchResult);
  const currentSearch = React.useRef<NodeJS.Timeout>();
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    if (!text) return;
    if (currentSearch.current) {
      clearTimeout(currentSearch.current);
      currentSearch.current = undefined;
    }
    currentSearch.current = setTimeout(
      () =>
        dispatch(
          searchPostAction({
            q: text,
            page: 1,
            limit: 5,
          })
        ),
      500
    );
  };
  return (
    <div className="header-input">
      <input
        type="text"
        placeholder="Nhập nội dung tìm kiếm"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => toggleResult(true)}
        onChangeCapture={handleSubmit}
      />
      <div className="icon-search">
        <BsSearch />
      </div>
      <div
        className="result-search"
        style={{ display: showResult ? 'block' : 'none' }}
      >
        <div className="list-result-search">
          {posts.map((e, i) => (
            <Link to={e.url} key={i} onClick={() => toggleResult(false)}>
              <div className="item-result-search">{e.title}</div>
            </Link>
          ))}

          {text && (
            <Link to="22">
              <div className="item-result-search">
                xem các kết quả của "
                {text.length > 20 ? text.slice(0, 20) + '...' : text}"
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
