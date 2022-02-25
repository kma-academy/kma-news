/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  createPersonalChannelAction,
  searchCategoryAction,
  selectLoading,
  selectMessage,
  selectRedirectSuccess,
} from '@kma-news/channel-slice';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ItemData, SelectItem } from './SelectItem';
import { useNavigate } from 'react-router-dom';
import { CategoryType } from '@kma-news/api-interface';

const CategoryCreatePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentSearchCategoryRef = useRef<NodeJS.Timeout>();
  const loading = useAppSelector(selectLoading);
  const message = useAppSelector(selectMessage);
  const redirectSuccess = useAppSelector(selectRedirectSuccess);
  const [name, setName] = useState('');
  const [keywords, setKeywords] = useState<string[]>(['baomoi']);
  const [excludedKeywords, setExcludedKeywords] = useState<string[]>([
    'kenh14',
  ]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [excludedCategories, setExcludedCategories] = useState<CategoryType[]>(
    []
  );
  const [includeSelect, toggleIncludeSelect] = useState(false);
  const [excludeSelect, toggleExcludeSelect] = useState(false);
  const [includeText, setIncludeText] = useState('');
  const [excludeText, setExcludeText] = useState('');
  const navigate = useNavigate();
  if (redirectSuccess) navigate('/ca-nhan/muc-cua-ban/');

  const handleSubmit = () => {
    dispatch(
      createPersonalChannelAction({
        name,
        keywords,
        excludedKeywords,
        categories: [],
        excludedCategories: [],
        publishers: [],
        excludedPublishers: [],
      })
    );
  };

  const handleAddInclude = (item: ItemData) => {
    console.log(item);

    if (item.type === 'keyword') {
      setKeywords((prevState) => [...prevState, item.data as string]);
    }
    if (item.type === 'category') {
      setCategories((prevState) => [...prevState, item.data as CategoryType]);
    }
    toggleIncludeSelect(false);
    setIncludeText('');
  };
  const handleAddExclude = (item: ItemData) => {
    console.log(item);

    if (item.type === 'keyword') {
      setExcludedKeywords((prevState) => [...prevState, item.data as string]);
    }
    if (item.type === 'category') {
      setExcludedCategories((prevState) => [
        ...prevState,
        item.data as CategoryType,
      ]);
    }
    toggleExcludeSelect(false);
    setExcludeText('');
  };

  const removeKeyword = (index: number, excluded = false) => {
    if (!excluded)
      setKeywords((prevState) => prevState.filter((e, i) => i !== index));
    else
      setExcludedKeywords((prevState) =>
        prevState.filter((e, i) => i !== index)
      );
  };
  const removeCategory = (index: number, excluded = false) => {
    if (!excluded)
      setCategories((prevState) => prevState.filter((e, i) => i !== index));
    else
      setExcludedCategories((prevState) =>
        prevState.filter((e, i) => i !== index)
      );
  };
  useEffect(() => {
    if (currentSearchCategoryRef.current)
      clearTimeout(currentSearchCategoryRef.current);
    currentSearchCategoryRef.current = setTimeout(() => {
      dispatch(searchCategoryAction(includeText));
    }, 500);
    return () => {
      if (currentSearchCategoryRef.current)
        clearTimeout(currentSearchCategoryRef.current);
    };
  }, [dispatch, includeText]);

  useEffect(() => {
    if (currentSearchCategoryRef.current)
      clearTimeout(currentSearchCategoryRef.current);
    currentSearchCategoryRef.current = setTimeout(() => {
      dispatch(searchCategoryAction(excludeText));
    }, 500);
    return () => {
      if (currentSearchCategoryRef.current)
        clearTimeout(currentSearchCategoryRef.current);
    };
  }, [dispatch, excludeText]);
  return (
    <div className="form-create-category">
      <div className="title-form">
        <span>Tạo mục</span>
      </div>
      <div className="form-main">
        <div className="item-form">
          <div className="input-form">
            <label>Tên mục</label>
            <input
              type="text"
              placeholder="Nhập tên thư mục của bạn"
              name={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="item-form">
          <div className="input-form">
            <label>Bao gồm</label>
            <div className="input">
              {keywords.map((e, i) => (
                <div className="select-item" key={i}>
                  <span>{e}</span>
                  <button
                    className="btn-remove-item-select"
                    onClick={() => removeKeyword(i)}
                  >
                    <AiOutlineCloseCircle color="#fff" size="16px" />
                  </button>
                </div>
              ))}
              {categories.map((e, i) => (
                <div className="select-item" key={i}>
                  <span>{e.title}</span>
                  <button
                    className="btn-remove-item-select"
                    onClick={() => removeCategory(i)}
                  >
                    <AiOutlineCloseCircle color="#fff" size="16px" />
                  </button>
                </div>
              ))}
              <input
                type="text"
                onFocus={() => toggleIncludeSelect(true)}
                // onBlur={() => toggleIncludeSelect(false)}
                value={includeText}
                onChange={(e) => setIncludeText(e.target.value)}
              />
            </div>
          </div>
          {includeSelect && (
            <SelectItem onSelected={handleAddInclude} keyword={includeText} />
          )}
        </div>
        <div className="item-form">
          <div className="input-form">
            <label>Loại trừ</label>
            <div className="input">
              {excludedKeywords.map((e, i) => (
                <div className="select-item" key={i}>
                  <span>{e}</span>
                  <button
                    className="btn-remove-item-select"
                    onClick={() => removeKeyword(i, true)}
                  >
                    <AiOutlineCloseCircle color="#fff" size="16px" />
                  </button>
                </div>
              ))}
              {excludedCategories.map((e, i) => (
                <div className="select-item" key={i}>
                  <span>{e.title}</span>
                  <button
                    className="btn-remove-item-select"
                    onClick={() => removeCategory(i, true)}
                  >
                    <AiOutlineCloseCircle color="#fff" size="16px" />
                  </button>
                </div>
              ))}
              <input
                type="text"
                onFocus={() => toggleExcludeSelect(true)}
                // onBlur={() => toggleExcludeSelect(false)}
                value={excludeText}
                onChange={(e) => setExcludeText(e.target.value)}
              />
            </div>
          </div>
          {excludeSelect && (
            <SelectItem onSelected={handleAddExclude} keyword={excludeText} />
          )}
        </div>
        {loading === 'error' && <div>{message}</div>}
        <div className="group-btn">
          <button
            className="btn cancel"
            onClick={() => navigate('/ca-nhan/muc-cua-ban')}
          >
            Hủy bỏ
          </button>
          <button className="btn create" onClick={handleSubmit}>
            Tạo mục
          </button>
        </div>
      </div>
    </div>
  );
};
export default CategoryCreatePage;
