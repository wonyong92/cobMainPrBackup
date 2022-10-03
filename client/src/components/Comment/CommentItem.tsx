import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import TextButton from '../../UI/button/TextButton';
import { CommentData } from './CommentWrite';
import {ChangeEvent, useContext, useState } from 'react';
import { deleteComment, updateComment } from '../../Utils/ApiCall';
import { UserContext } from '../../context/context';
import TextInput from '../../UI/input/TextInput';

    


export interface CommentDataProps {
    data: CommentData;
    
}

const CommentItem = ({data}:CommentDataProps) => {

    const { user } = useContext(UserContext);
    const [editComment, setEditComment] = useState(false);
    const [text, setText] = useState(data.commentContents);
    
    const deleteCommentHandler =()=> {
    deleteComment(data.commentId);
   
    }

    const editCommentHandler = () => {
    setEditComment(true);
    }

    const commentHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

        



    }

    const updateCommentHandler = () => {
        updateComment({
            commentContents: text,
            commentId: data.commentId,
            writerId: data.writerId,
        },data.commentId);
            
            
    }



   return (
        <>
    
        <CommentItemWrapper>
            <CommentItemHeader>
                <Link to={`/user/${'user.id'}`}>{'user.nickname'}</Link>
                <span>{'createdAt'}</span>
            </CommentItemHeader>
            <CommentItemContent>{data.commentContents}</CommentItemContent>
            {user.memberId === data.writerId ?
                <CommentItemFooter>
                    <TextButton text='수정' isGray={true} btnText={'수정'} onClick={editCommentHandler}/>
                    {editComment ? <><TextInput type='text' value={text} onChange={commentHandler} placeholder={''}/>
                        <TextButton text='확인' isGray={true} btnText={'확인'}  onClick={updateCommentHandler}/></>
                     : null}
                    <TextButton text='삭제' isGray={true} btnText={'삭제'} onClick={deleteCommentHandler}/>
                </CommentItemFooter>
             : null}
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
    margin-top: 0.5rem;
`;


export default CommentItem;

// const onDelete = () => {
    //     deleteComment('id').then((res) => {
    //         setComments(res.data);
    //         console.log(res);
    //     });
        
    // };
    //  const onUpdate = () => {
    //     updateComment().then((res) => {
    //         console.log(res);
    //     });
    // };