const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
import { useParams } from 'react-router-dom';
import AxiosInstance from './AxiosInstance';
import { CommentData } from '../components/Comment/CommentWrite';

//POST
export const getPosts = async (sortType?: string) => {
  try {
    const res = await AxiosInstance.get(`${PROXY}/rentPost/posts?sort=${sortType}`);

    return res.data;
  } catch (error) {}
};

export const getPost = async (postId: number) => {
  try {
    const res = await AxiosInstance.post(`${PROXY}/rentPost?postId=${postId}`);

    return res.data;
  } catch (error) {}
};

export const getImage = async () => {
  const params = useParams();
  try {
    const res = await AxiosInstance.get(`${PROXY}/rentPost/images/get?postId=${params.id}`);

    const data = res.data;
    return data;
  } catch (error) {}
};

export const sendPost = async (post: any) => {
  try {
    post.location = `location${post.location}`;
    post.category = `category${post.category}`;
    post.rentPrice = parseInt(post.rentPrice);

    const res = await AxiosInstance.post(`${PROXY}/rentPost/post`, post);

    return res.data;
  } catch (error) {}
};

export const sendImage = async (image: FormData, postId: number) => {
  console.log(image, postId);
  try {
    const res = await AxiosInstance.post(`${PROXY}/rentPost/images/?postId=${postId}`, image);

    const data = res.data;
    return data;
  } catch (error) {}
};

export const updatePost = async (post: any) => {
  try {
    post.location = `location${post.location}`;
    post.category = `category${post.category}`;
    const res = await AxiosInstance.put(`${PROXY}/rentPost/update`, {
      deleteImages: [post.deleteImages],
      location: post.location,
      category: post.category,
      postId: post.rentPostId,
      rentPostContents: post.rentPostContents,
      rentPostName: post.rentPostName,
      rentPrice: post.rentPrice,
      rentStatus: post.rentStatus,
    });
  } catch (error) {}
};

export const deletePost = async (id: any) => {
  try {
    const res = await AxiosInstance.delete(`${PROXY}/rentPost/delete/?postId=${id}`);

    const data = res.data;
    return data;
  } catch (error) {}
};

//COMMENTS
export const getComments = async (postId: number) => {
  try {
    const res = await AxiosInstance.get(`${PROXY}/comment/getComments?postId=${postId}`);

    const data = res.data;
    return data;
  } catch (error) {}
};

export const sendComment = async (comment: CommentData) => {
  try {
    const res = await AxiosInstance.post(`${PROXY}/comment/post`, comment);

    const data = res.data;
    return data;
  } catch (error) {}
};

export const updateComment = async (comment: any, commentId: number) => {
  try {
    const res = await AxiosInstance.post(`${PROXY}/comment/update?id=${commentId}`, {
      commentId: comment.commentId,
      writerId: comment.writerId,
      commentContents: comment.commentContents,
    });

    const data = res.data;
    return data;
  } catch (error) {}
};

export const deleteComment = async (commentId: number) => {
  try {
    const res = await AxiosInstance.post(`${PROXY}/comment/delete?commentId=${commentId}`);

    const data = res.data;
    return data;
  } catch (error) {}
};
