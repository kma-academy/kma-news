import React, { createRef } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai"
import { useState, useEffect, useRef } from 'react'

interface CategoryProp {
  setActiveFormCreate?: (value: boolean) => void;
}

const CategoryPage: React.FC<CategoryProp> = ({ setActiveFormCreate }) => {
  const [listSelect, setListSelect] = useState([""]);
  const [data, setData] = useState([""]);

  const inputRef2 = useRef<any>(null);
  const inputRef3 = useRef<any>(null);

  const [activeDrop2, setActiveDropInput2] = useState(false);
  const [activeDrop3, setActiveDropInput3] = useState(false);
  const [nameFolder, setNameFolder] = useState("");
  const [listCategory, setListCategory] = useState("");
  const [listCategoryRemove, setListCategoryRemove] = useState("");
  useEffect(() => {
    const fetchData = ["zing", "chinhphu", "tienphong"];
    setData(fetchData);
  }, [])
  const addSelectItem = (e: string) => {
    setListSelect(prevState => [...prevState, e]);
    setData(prevState => prevState.filter((item, index) => item !== e));
  }
  const removeSelectItem = (e: string) => {
    setListSelect(prevState => prevState.filter((item, index) => item !== e));
  }

  const focusInput2 = () => {
    inputRef2.current.focus();
    setActiveDropInput2(!activeDrop2)
  }
  const focusInput3 = () => {
    inputRef3.current.focus();
    setActiveDropInput3(!activeDrop3)
  }

  const addCategory = () => {

  }

  const addCategoryRemove = () => {

  }

  return (
    <div className="form-create-category">
      <div className="title-form">
        <span>Tạo mục</span>
      </div>
      <div className="form-main">
        <div className="item-form">
          <div className="input-form">
            <label>Tên mục</label>
            <input type="text" placeholder='Nhập tên thư mục của bạn' />
          </div>
        </div>
        <div className="item-form">
          <div className="input-form" onClick={focusInput2}>
            <label>Bao gồm</label>
            <div className="input">
              {listSelect.map((e, index) => (
                <div className="select-item" key={index}>
                  <span>{e}</span>
                  <button className='btn-remove-item-select' onClick={() => removeSelectItem(e)}>
                    <AiOutlineCloseCircle color='#fff' size="16px" />
                  </button>
                </div>
              ))}
              <input type="text" ref={inputRef2} />
              {/* <div className="placehoder-input"  >
                <span>Nhập</span>,
                <span> Từ khóa</span>,
                <span> Chuyên mục</span>,
                <span> Nguồn tin</span>
              </div> */}
            </div>
          </div>
          <div className="drop-table" style={!activeDrop2 ? { display: 'none' } : { display: 'block' }}>
            <div>
              <div className="title-drop">
                Nguồn báo :
              </div>
              {data.map((e, index) => (
                <div className="item-drop" key={index} onClick={() => addSelectItem(e)}>
                  <span>{e}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="title-drop">
                Chuyên mục :
              </div>
              <div className="item-drop" >
                <span>Hình sự - Dân sự</span>
              </div>
              <div className="item-drop">
                <span>Bóng đá quốc tế</span>
              </div>
            </div>
          </div>
        </div>
        <div className="item-form">
          <div className="input-form" onClick={focusInput3}>
            <label>Loài trừ</label>
            <div className="input">
              {listSelect.map((e, index) => (
                <div className="select-item" key={index}>
                  <span>{e}</span>
                  <button className='btn-remove-item-select' onClick={() => removeSelectItem(e)}>
                    <AiOutlineCloseCircle color='#fff' size="16px" />
                  </button>
                </div>
              ))}
              <input type="text" ref={inputRef3} />
              {/* <div className="placehoder-input"  >
                <span>Nhập</span>,
                <span> Từ khóa</span>,
                <span> Chuyên mục</span>,
                <span> Nguồn tin</span>
              </div> */}
            </div>
          </div>
          <div className="drop-table" style={!activeDrop3 ? { display: 'none' } : { display: 'block' }}>
            <div>
              <div className="title-drop">
                Nguồn báo :
              </div>
              {data.map((e, index) => (
                <div className="item-drop" key={index} onClick={() => addSelectItem(e)}>
                  <span>{e}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="title-drop">
                Chuyên mục :
              </div>
              <div className="item-drop">
                <span>Hình sự - Dân sự</span>
              </div>
              <div className="item-drop">
                <span>Bóng đá quốc tế</span>
              </div>
            </div>
          </div>
        </div>
        <div className="group-btn" >
          <button className='btn cancel' onClick={() => console.log(setActiveFormCreate)}>Hủy bỏ</button>
          <button className='btn create'>Tạo mục</button>
        </div>
      </div>
    </div >
  )
}
export default CategoryPage
