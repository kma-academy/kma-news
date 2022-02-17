/* eslint-disable @nrwl/nx/enforce-module-boundaries */
// import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import React, { useEffect, useState } from 'react';
import { selectData } from '../../postSlice';
import {
  selectLoggedIn,
  selectProfile,
  togglePopup,
} from '@kma-news/auth-slice';
import Login from '@/features/Auth/components/Login';
import { createCommentAction } from '@kma-news/comment-slice';
export const CommentForm = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const loggedIn = useAppSelector(selectLoggedIn);
  const post = useAppSelector(selectData);
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (post?.id)
      dispatch(createCommentAction({ postId: post.id, message: text }));
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
    setTimeout(function () {
      console.log(e.target.value);
      e.target.style.cssText = 'height:auto; padding:0';
      e.target.style.cssText = 'height:' + (e.target.scrollHeight + 20) + 'px;';
    }, 0);
    setMessage(e.target.value);
  };
  const [isExtend, setExtend] = useState(false);
  const checkLogin = () => {
    if (!loggedIn) dispatch(togglePopup(true));
    else setExtend(true);
  };
  const isTextareaDisabled = text.length === 0;
  const [message, setMessage] = useState('');

  return (
    <div>
      <form onSubmit={onSubmit}>
        <textarea
          placeholder="Ý kiến của bạn"
          className={isExtend ? 'comment__textBox--full' : 'comment__textBox'}
          onFocus={checkLogin}
          onChange={onChange}
        />

        {isExtend && (
          <div className="comment__textBox__btnBox">
            <button
              className="comment__textBox__btn"
              disabled={isTextareaDisabled}
            >
              Gửi
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
