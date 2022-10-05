import PostDetailItem from '../../components/PostItem/PostDetailItem';
import styled from 'styled-components';
import Button from '../../UI/button/Button';
import { useState, useEffect } from 'react';
import { getPost } from '../../Utils/ApiCall';
import { PostItemDetailData } from '../../components/PostItem/PostDetailItem';
import CommentList from '../../components/Comment/CommentList';
import CommentWrite from '../../components/Comment/CommentWrite';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const params = useParams<{ id: string }>();
  const initialState = {
    category: '',
    rentPostImages: [0],
    location: '',
    rentPostContents: '',
    rentPostId: 0,
    rentPostName: '',
    rentPrice: 0,
    rentStatus: true,
    updateDate: '',
    viewCount: 0,
    writeDate: '',
    writerId: 0,
    deleteModal: false,
    commentId: 0,
    setDeleteModal: () => {},
  };

  const [post, setPost] = useState<PostItemDetailData>(initialState);
  useEffect(() => {
    getPost(Number(params.id))
      .then((res) => {
        console.log(res);
        setPost(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ItemContainer>
      <PostDetailItem data={post} />
      {/* <ContentContainer></ContentContainer> */}
      <CommentCount>댓글</CommentCount>
      <CommentWrite postId={post.rentPostId} />
      <CommentList post={post} />
    </ItemContainer>
  );
};
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 1000px;
  @media screen and (max-width: 500px) {
    width: 95%;
  }
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  padding-top: 10px;
  margin-bottom: 1rem;
  padding-left: 20px;
  font-size: 1.2rem;
  line-height: 1.5;
  color: #495057;
  word-break: break-all;
  .button {
    display: flex;
    flex-direction: row-reverse;
    padding-right: 20px;
  }
`;

const CommentCount = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 15px;
  line-height: 1.5;
  color: #464646;
  word-break: break-all;
`;

export default PostDetail;
