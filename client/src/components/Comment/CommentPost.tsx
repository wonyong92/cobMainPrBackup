import React, { useState } from 'react';
import styled from 'styled-components';
import { ChangeEvent } from 'react';
import Button from '../../UI/button/Button';
import TextInput from '../../UI/input/TextInput';

const CommentPost = () => {

    const [comment, setComment] = useState('');
  
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
  
  
