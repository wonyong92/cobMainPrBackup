// import React from 'react';
// import styled from 'styled-components';
// import { useState } from 'react';
// // import { formatDate } from '../../utils/formatDate';




// interface Props {
//     comment: Comment;
//     onDelete: (id: number) => void;
// }

const CommentList = () => {

//     const [comments, setComments] = useState([]);

// // axios.get('http://localhost:4000/comments')
// //     .then((res) => {
// //         setComments(res.data);
// //     })
// //     .catch((err) => {
// //         console.log(err);
// //     });


//     return (
//         <>
   

//     // const { id, content, createdAt, user } = comment;
  
//     // const isOwner = userId === user.id;
//     return (
//         <CommentItemWrapper>
//             <CommentItemHeader>
//                 {/* <Link to={`/user/${user.id}`}>{user.nickname}</Link> */}
//                 <span>{formatDate(createdAt)}</span>
//             </CommentItemHeader>
//             <CommentItemContent>{content}</CommentItemContent>
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
