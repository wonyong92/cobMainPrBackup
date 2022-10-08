import PostDetailItem from '../../components/PostItem/PostDetailItem';
import styled from 'styled-components';
import Button from '../../UI/button/Button';
import { useState, useEffect } from 'react';
import { getPost } from '../../Utils';
import { PostItemDetailData } from '../../components/PostItem/PostDetailItem';
import CommentList from '../../components/Comment/CommentList';
import CommentWrite from '../../components/Comment/CommentWrite';
import { useParams } from 'react-router-dom';
import { config } from '../../config/config';
import { CommentData } from '../../components/Comment/CommentWrite';
import { getComments } from '../../Utils';
import useScroll from '../../hooks/useScroll';

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
  useScroll();
  useEffect(() => {
    getPost(Number(params.id))
      .then((res) => {
        setPost(res);
      })
      .catch((err) => {});
  }, []);
  const compare = (a: any, b: any) => {
    const aDate = new Date(a.updateDate).getTime();
    const bDate = new Date(b.updateDate).getTime();
    return bDate - aDate;
  };
  const [comments, setComments] = useState<CommentData[]>([]);
  useEffect(() => {
    getComments(post.rentPostId).then((res) => {
      const newList = res.comments;
      newList.sort(compare);

      setComments(newList);
    });
  }, [post.rentPostId, setComments]);

  return (
    <ItemContainer>
      <PostDetailItem data={post} />
      <CommentCount>댓글</CommentCount>
      <CommentWrite postId={post.rentPostId} setRenewCommentsList={setComments} renewComments={comments} />
      <CommentList comments={comments} setRenewCommentsList={setComments} renewComments={comments} />
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

const CommentCount = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 15px;
  line-height: 1.5;
  color: #464646;
  word-break: break-all;
`;

export default PostDetail;
