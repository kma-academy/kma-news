import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormCreateCategory from "./FormCreateCategory";
function CategoryPageMain() {
    const [activeFormCreate, setActiveFormCreate] = useState(false);
    return (
        <>
            {!activeFormCreate ? <div className='category-page-main'>
                <div className='notification'>
                    <div>Bạn chưa có mục riêng, hãy tạo mục để theo dõi những tin tức yêu thích và chia sẻ cùng bạn bè</div>
                </div>
                <div>
                    <button className="btn create-category" onClick={() => setActiveFormCreate(true)}>Tạo mục</button>
                </div>
            </div> : <FormCreateCategory setActiveFormCreate={setActiveFormCreate} />}
        </>
    );
}

export default CategoryPageMain;