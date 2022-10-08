import CommentItem from './CommentItem';
import { getComments } from '../../Utils/post';
import { useState, useEffect } from 'react';
import { PostItemDetailData } from '../PostItem/PostDetailItem';
import { CommentData } from './CommentWrite';

export interface CommentListProps {
  comments: CommentData[];
}
const CommentList = ({ comments }: CommentListProps) => {
  return (
    <>
      {comments &&
        comments.map((el) => (
          <div key={el.commentId}>
            <CommentItem data={el} />
          </div>
        ))}
    </>
  );
};

export default CommentList;
