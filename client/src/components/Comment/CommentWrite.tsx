import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChangeEvent,MouseEvent } from 'react';
import Button from '../../UI/button/Button';
import TextInput from '../../UI/input/TextInput';
import { sendComment } from '../../Utils/ApiCall';
import { UserContext } from '../../context/context';
import { useContext } from 'react';

export interface CommentData {
 
  writerId: number | undefined;
  targetPostId: number;
  commentContents: string;
  commentId: number;
  
  
}

export interface CommentWriteProps {
  postId: number;
}



const CommentWrite = ({postId}:CommentWriteProps) => {
  const {user} = useContext(UserContext);

    const [comment, setComment] = useState<CommentData>({
        commentContents: '',
        targetPostId: postId,
        writerId: user.memberId,
        commentId: 0,
        
        
});
useEffect(() => {
  setComment({...comment,targetPostId:postId})
}, [postId])

    const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
       setComment({...comment,[name]:value});
      }
  
  
    const clickHandler = () => {
      sendComment(comment)
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
  const CommentWrapper = styled.div`
    border: 1px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    
  `;
  
    



  export default CommentWrite;
  
  
