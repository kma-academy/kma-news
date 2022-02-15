/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  createPersonalChannelAction,
  selectLoading,
} from '@kma-news/channel-slice';
import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ItemData, SelectItem } from './SelectItem';
import { useNavigate } from 'react-router-dom';

const CategoryCreatePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const [name, setName] = useState('');
  const [keywords, setKeywords] = useState<string[]>(['baomoi']);
  const [excludedKeywords, setExcludedKeywords] = useState<string[]>([
    'kenh14',
  ]);
  const [includeSelect, toggleIncludeSelect] = useState(false);
  const [excludeSelect, toggleExcludeSelect] = useState(false);
  const [includeText, setIncludeText] = useState('');
  const [excludeText, setExcludeText] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (loading === 'done') navigate('/ca-nhan/muc-cua-ban/');
  }, [loading, navigate]);

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
      setKeywords((prevState) => [...prevState, item.content]);
    }
    toggleIncludeSelect(false);
    setIncludeText('');
  };
  const handleAddExclude = (item: ItemData) => {
    console.log(item);

    if (item.type === 'keyword') {
      setExcludedKeywords((prevState) => [...prevState, item.content]);
    }
    toggleExcludeSelect(false);
    setExcludeText('');
  };

  const removeKeywords = (index: number) => {
    setKeywords((prevState) => prevState.filter((e, i) => i !== index));
  };

  const removeExcludedKeywords = (index: number) => {
    setExcludedKeywords((prevState) => prevState.filter((e, i) => i !== index));
  };

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
                    onClick={() => removeKeywords(i)}
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
                    onClick={() => removeExcludedKeywords(i)}
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
        <div className="group-btn">
          <button className="btn cancel" onClick={() => navigate('../')}>
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
