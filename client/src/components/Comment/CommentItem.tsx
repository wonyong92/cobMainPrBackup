import styled from 'styled-components';
import {Link} from 'react-router-dom';
import TextButton from '../../UI/button/TextButton';
// import { useEffect, useState } from 'react';

interface Props {
    postId: string;
    userId: string;
    userName: string;
    content: string;
    createdAt: string;
    onDelete: (id: number) => void;
    

}

const CommentItem = ({commentData}:any) => {

    // const [isOwner, setIsOwner] = useState<boolean>(false);
   
    
   
    // useEffect(() => {
    //     if (data.userId === userId) {
    //         setIsOwner(true);
    //     }
    // }, [data.userId, userId]);


   return (
        <>
        <CommentItemWrapper>
            <CommentItemHeader>
                <Link to={`/user/${'user.id'}`}>{'user.nickname'}</Link>
                <span>{'createdAt'}</span>
            </CommentItemHeader>
            <CommentItemContent>{commentData.comments}</CommentItemContent>
            {/* {isOwner && ( */}
                <CommentItemFooter>
                    <TextButton text='수정' btnText={''} />
                    <TextButton text='삭제' btnText={''} onClick={() =>{}}/>
                </CommentItemFooter>
             {/* )} */}
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
