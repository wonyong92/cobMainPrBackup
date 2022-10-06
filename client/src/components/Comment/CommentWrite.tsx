import { config } from '../../config/config';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChangeEvent, MouseEvent } from 'react';
import Button from '../../UI/button/Button';
import TextInput from '../../UI/input/TextInput';
import { sendComment } from '../../Utils/ApiCall';
import { UserContext } from '../../context/context';
import { useContext } from 'react';
const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
export interface CommentData {
  writerId: number | undefined;
  targetPostId: number;
  commentContents: string;
  commentId: number;
  writeDate?: string;
}

export interface CommentWriteProps {
  postId: number;
}

const CommentWrite = ({ postId }: CommentWriteProps) => {
  const { user } = useContext(UserContext);

  const [comment, setComment] = useState<CommentData>({
    commentContents: '',
    targetPostId: postId,
    writerId: user.memberId,
    commentId: 0,
  });
  useEffect(() => {
    setComment({ ...comment, targetPostId: postId });
  }, [postId]);

  const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const clickHandler = () => {
    sendComment(comment);
    window.location.reload();
  };

  const imgUrl = `${PROXY}/member/profileImage/get?memberId=${user.memberId}`;
  return (
    <>
      <CommentWrapper>
        <Image alt="practice" src={imgUrl} />
        <TextInput
          type={'text'}
          placeholder={'댓글을 입력하세요'}
          onChange={onChangeComment}
          value={comment.commentContents}
          name={'commentContents'}
        />
        <Button text="댓글작성" width="short" onClick={clickHandler} />
      </CommentWrapper>
    </>
  );
};
const CommentWrapper = styled.div`
  width: 100%;
  border: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  padding: 20px;
  button {
    margin-left: 5px;
    white-space: nowrap;
  }
  input {
    width: 600px;
    height: 33px;
    border-radius: 0px;
  }
  @media screen and (max-width: 500px) {
    input {
      width: 230px;
    }
  }
`;

export const Image = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  padding-right: 0;
`;

export default CommentWrite;
