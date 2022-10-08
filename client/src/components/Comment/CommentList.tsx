import CommentItem from './CommentItem';
import { getComments } from '../../Utils/post';
import { useState, useEffect } from 'react';
import { PostItemDetailData } from '../PostItem/PostDetailItem';
import { CommentData } from './CommentWrite';

export interface CommentListProps {
  comments: CommentData[];
  setRenewCommentsList: (renewComments: any) => void;
  renewComments: CommentData[];
}
const CommentList = ({ comments, setRenewCommentsList, renewComments }: CommentListProps) => {
  return (
    <>
      {comments &&
        comments.map((el) => (
          <div key={el.commentId}>
            <CommentItem
              data={el}
              setRenewCommentsList={setRenewCommentsList}
              renewComments={renewComments}
            />
          </div>
        ))}
    </>
  );
};

export default CommentList;
