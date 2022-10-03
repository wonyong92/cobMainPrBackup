 import CommentItem from './CommentItem';
import { getComments } from '../../Utils/ApiCall';
import { useState, useEffect } from 'react';
import { PostItemDetailData } from '../PostItem/PostDetailItem';

interface CommentListProps {
  post: PostItemDetailData;
}
const CommentList = ({post}:CommentListProps) => {

  const [comments, setComments] = useState([]);

  useEffect (() => {
    getComments(post.rentPostId).then((res) => {
        console.log(res);
        setComments(res.comments);
    });
}, [post.rentPostId]);
console.log(comments);
    return (
      <>
      {comments && comments.map((el, idx) => ( 
        <CommentItem key={idx} data={el}/>
      ))} 
      </> 
    );
      }
     

export default CommentList;
