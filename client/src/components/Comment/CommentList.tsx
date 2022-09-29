 import CommentItem from './CommentItem';
import { getComments } from '../../Utils/ApiCall';
import { useState, useEffect } from 'react';

const CommentList = () => {

  const [comments, setComments] = useState([]);

  useEffect (() => {
    getComments().then((res) => {
        console.log(res);
        setComments(res.data);
    });
}, []);

    return (
      <>
      {comments && comments.map((el, idx) => (
        <CommentItem
          commentData={el} key={idx} />
      ))}
      </>
    );
      }
     

export default CommentList;
