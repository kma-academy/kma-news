/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import './commentBox.css';
import { CommentForm } from './CommentForm';
import { getCommentByPostAction, selectComment } from '@kma-news/comment-slice';
import { selectData } from '../../postSlice';
import { CommentItem } from './CommentItem';
export const CommentBox = () => {
  const dispatch = useAppDispatch();
  const [displaySort, setDisplaySort] = useState(true);
  const post = useAppSelector(selectData);
  const commentData = useAppSelector(selectComment);
  useEffect(() => {
    if (post?.id) dispatch(getCommentByPostAction(post.id));
  }, [post]);
  return (
    <div className="frameComment">
      <div className="comment__title">
        Ý kiến <span className="comment__number">(265)</span>
      </div>
      <CommentForm />
      <div className="comment__action">
        <div
          className={
            displaySort
              ? 'comment__sort comment__sort--active'
              : 'comment__sort comment__sort--un-active'
          }
          onClick={() => {
            setDisplaySort(true);
          }}
        >
          Quan tâm nhất
        </div>
        <div
          className={
            displaySort
              ? 'comment__sort comment__sort--un-active'
              : 'comment__sort comment__sort--active'
          }
          onClick={() => {
            setDisplaySort(false);
          }}
        >
          Mới nhất
        </div>
      </div>
      <div className="comment__box">
        {commentData.map((dataComment) => (
          <CommentItem display={true} data={dataComment} />
        ))}
      </div>
    </div>
  );
};
