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
  
    const ClickHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(comment);
      setComment('');
    };
  
    return (
      <>
        <CommentWrapper>
          <TextInput
            type="text"
            value={comment}
            onChange={onChange}
            placeholder="댓글을 입력하세요" name={''}          />
          <Button text="댓글작성" width='short' onClick={()=>ClickHandler} />
          </CommentWrapper>
           </>
    );
  };
  
  const CommentWrapper = styled.form`
    border: 1px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    
    .Button{
      padding-right:5px;
    }
  `;
  
   



  export default CommentPost;
  
  
