import styled from 'styled-components';
import { useState } from 'react';





interface Props {
    comment: Comment;
    onDelete: (id: number) => void;
}

const CommentList = () => {

//     const [comments, setComments] = useState([]);

//         <CommentItemWrapper>
//             <CommentItemHeader>
//                 <Link to={`/user/${user.id}`}>{user.nickname}</Link>
//                 <span>{FormData(createdAt)}</span>
//             </CommentItemHeader>
//             <CommentItemContent>{comments}</CommentItemContent>
//             {isOwner && (
//                 <CommentItemFooter>
//                     <button>수정</button>
//                     <button onClick={() => onDelete(id)}>삭제</button>
//                 </CommentItemFooter>
//             )}
//         </CommentItemWrapper>
//     );
};

export default CommentList;
