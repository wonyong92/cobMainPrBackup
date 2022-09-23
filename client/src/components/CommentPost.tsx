import React, { useState } from 'react';
import styled from 'styled-components';
import { ChangeEvent } from 'react';
import Button from './Button';
import TextInput from './TextInput';

const CommentPost = () => {

    const [comment, setComment] = useState('');
    // const [commentError, setCommentError] = useState(false);

    // const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    //     setComment(e.target.value);
    //     setCommentError(false);
    // };

    // const onClickComment = () => {
    //     if (comment === '') {
    //         setCommentError(true);
    //         return;
    //     }
    //     setComment('');
    // };

    

    // const onSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault();
    //     axios.post('http://localhost:4000/comments', {
    //         content: content,
    //         postId: postId,
    //         userId: userId,
    //     })
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    

   
  
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setComment(e.target.value);
    };
  
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(comment);
      setComment('');
    };
  
    return (
      <>
        <h4>댓글 작성</h4>
        <CommentForm onSubmit={onSubmit}>
          <TextInput
            type="text"
            value={comment}
            onChange={onChange}
            placeholder="댓글을 입력하세요"
          />
          <Button text="댓글작성" onClick={function (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
            throw new Error('Function not implemented.');
          }} />
        </CommentForm>
      </>
    );
  };
  
  const CommentForm = styled.form`
    border: 1px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  `;
  
  export default CommentPost;
  
  
