import { useState } from 'react';
import styled from 'styled-components';
import { ChangeEvent,MouseEvent } from 'react';
import Button from '../../UI/button/Button';
import TextInput from '../../UI/input/TextInput';
import { sendComment } from '../../Utils/ApiCall';

export interface CommentData {
  writerId: number;
  targetPostId: number;
  commentContents: string;
}



const CommentWrite = () => {

    const [comment, setComment] = useState({
        commentContents: '',
        targetPostId: 0,
        writerId: 0,
    });
  
    const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
       setComment({...comment,[name]:value});
      

       
      
      }
  
  
    const clickHandler = () => {
      sendComment({
        commentContents: comment.commentContents,
            targetPostId: comment.targetPostId,
            writerId: comment.writerId,
         })
        }
  
    return (
      <>
        <CommentWrapper>
          <TextInput
            type={'text'}
            placeholder={"댓글을 입력하세요"}
            onChange={onChangeComment}
            value={comment.commentContents}
            name={'commentContents'} />
          <Button text='댓글작성' width='short' onClick={clickHandler} />
          </CommentWrapper>
           </>
    );
    
}
  const CommentWrapper = styled.form`
    border: 1px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    
  `;
  
    



  export default CommentWrite;
  
  
