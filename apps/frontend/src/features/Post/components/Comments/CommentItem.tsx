/* eslint-disable eqeqeq */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Comment } from 'libs/api-interface/src/comment/comment.interface';
import React, { useState } from 'react';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai';
import { TiArrowForward } from 'react-icons/ti';
import './commentItem.css';
import { CommentForm } from './CommentForm';
import moment from 'moment';
import { ProfileResponse } from '@kma-news/api-interface';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deleteCommentAction } from '@kma-news/comment-slice';
import { selectData } from '../../postSlice';
export interface Props {
  display: boolean;
  isLoggin: boolean;
  user?: ProfileResponse;
  data: Comment;
}
export const CommentItem: React.FC<Props> = (props) => {
  const [displayInput, setDisplayInput] = useState(false);
  const { data, isLoggin, user } = props;
  const post = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  const deletaComment = () => {
    dispatch(deleteCommentAction({ postId: post?.id, id: data.id }));
  };
  return (
    <div className="commentBox">
      <div className="commentBox__image">
        <img src={data.author.avatarURL} alt="" className="commentBox__image" />
      </div>
      <div className="commentBox__right">
        <div className="commentBox__content">
          <span className="commentBox-name">{data.author.name}</span>
          {data.content}
        </div>
        <div className="commentBox__action-list">
          {/* <div className="commentBox__action-item">
            <span className="commentBox__number">265</span>
            <AiFillLike className="commentBox-icon commentBox-icon--like" />
          </div>
          <div className="commentBox__action-item">
            <span className="commentBox__number">265</span>
            <AiFillDislike className="commentBox-icon commentBox-icon--dislike" />
          </div> */}
          {/* <div className="commentBox__action-item">
            <span className="commentBox__reply" onClick={() => setDisplayInput(!displayInput)}>
              Trả lời
            </span>
          </div> */}
          <div className="commentBox__action-item">
            <span className="commentBox__time">
              {moment(data.createAt).locale('vi').fromNow()}
            </span>
            {user?.role == 'admin' || data.author.id == user?.id ? (
              <span className="commentBox__del" onClick={deletaComment}>
                Xóa
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
        {displayInput ? <CommentForm /> : ''}
        {/* {props.display ? (
          <div>
            <div className="comment__reply">
              <TiArrowForward className="comment__reply-icon" />
              <span className="comment__reply-count">26 trả lời</span>
            </div>
            <Comment display={false} />
            <Comment display={false} />
            <Comment display={false} />
            <Comment display={false} />
          </div>
        ) : (
          ''
        )} */}
      </div>
    </div>
  );
};
