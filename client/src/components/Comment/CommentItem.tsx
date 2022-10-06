import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TextButton from '../../UI/button/TextButton';
import { CommentData } from './CommentWrite';
import { ChangeEvent, useContext, useState } from 'react';
import { deleteComment, updateComment } from '../../Utils/ApiCall';
import { UserContext } from '../../context/context';
import TextInput from '../../UI/input/TextInput';
import { useNavigate } from 'react-router-dom';

export interface CommentDataProps {
  data: CommentData;
}

const CommentItem = ({ data }: CommentDataProps) => {
  const { user } = useContext(UserContext);
  const [editComment, setEditComment] = useState(false);
  const [text, setText] = useState(data.commentContents);
  const navigate = useNavigate();
  const createdAt = new Date(String(data.writeDate)).toLocaleDateString().slice(0, 11);
  const deleteCommentHandler = () => {
    deleteComment(data.commentId);
    window.location.reload();
  };

  const editCommentHandler = () => {
    setEditComment(true);
  };

  const commentHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const updateCommentHandler = () => {
    updateComment(
      {
        commentContents: text,
        commentId: data.commentId,
        writerId: data.writerId,
      },
      data.commentId,
    );
    window.location.reload();
  };

  const imgUrl = `http://3.35.90.143:54130/member/profileImage/get?memberId=${user.memberId}`;
  return (
    <>
      <CommentItemWrapper>
        <Image alt="practice" src={imgUrl} />
        <div>{user.nickname}</div>
        <CommentItemHeader>
          <span>{createdAt}</span>
        </CommentItemHeader>
        <CommentItemContent>{data.commentContents}</CommentItemContent>
        {user.memberId === data.writerId ? (
          <CommentItemFooter>
            {editComment ? (
              <>
                <TextInput type="text" value={text} onChange={commentHandler} placeholder={''} />
                <TextButton text="확인" isGray={true} btnText={'확인'} onClick={updateCommentHandler} />
              </>
            ) : (
              <>
                <TextButton text="수정" isGray={true} btnText={'수정'} onClick={editCommentHandler} />
                <TextButton text="삭제" isGray={true} btnText={'삭제'} onClick={deleteCommentHandler} />
              </>
            )}
          </CommentItemFooter>
        ) : null}
      </CommentItemWrapper>
    </>
  );
};

const CommentItemWrapper = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 1rem;
  margin-top: 1rem;
`;

const CommentItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  span {
    color: #868e96;
    font-size: 0.875rem;
  }
`;

const CommentItemContent = styled.div`
  font-size: 1rem;
`;

const CommentItemFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px;
  margin-top: 0.5rem;
  button {
    margin-right: 0.5rem;
    white-space: nowrap;
  }
  input {
    width: 685px;
    margin-right: 15px;
    border-radius: 0px;
  }
  @media screen and (max-width: 500px) {
    input {
      width: 270px;
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

export default CommentItem;

