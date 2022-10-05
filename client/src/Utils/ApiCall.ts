import { useParams } from 'react-router-dom';
import AxiosInstance from './AxiosInstance';
import { PostData } from '../pages/Post/PostWrite';
import { CommentData } from '../components/Comment/CommentWrite';

//POST
export const getPosts = async (sortType?: string) => {
  console.log(sortType);
  try {
    const res = await AxiosInstance.get(`rentPost/posts?sort=${sortType}`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getPost = async (postId: number) => {
  try {
    const res = await AxiosInstance.post(`rentPost?postId=${postId}`);
    // console.log(res);
    return res.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getImage = async () => {
  const params = useParams();
  try {
    const res = await AxiosInstance.get(`http://3.35.90.143:54130/rentPost/images/get?postId=${params.id}`);
    // console.log(res);
    // console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const sendPost = async (post: any) => {
  try {
    post.location = `location${post.location}`;
    post.category = `category${post.category}`;
    post.rentPrice = parseInt(post.rentPrice);
    // console.log(post);
    const res = await AxiosInstance.post(`rentPost/post`, post);
    // console.log(res);
    return res.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const sendImage = async (image: FormData, postId: number) => {
  try {
    const res = await AxiosInstance.post(`rentPost/images/?postId=${postId}`, image);
    // console.log(res);
    // console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const updatePost = async (post: any) => {
  try {
    post.location = `location${post.location}`;
    post.category = `category${post.category}`;
    const res = await AxiosInstance.put(`rentPost/update`, {
      delelteImages: [0],
      location: post.location,
      rentPostId: post.rentPostId,
      rentPostContents: post.rentPostContents,
      rentPostName: post.rentPostName,
      rentPrice: post.rentPrice,
      rentStatus: post.rentStatus,
    });
    console.log(res);
    // console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const deletePost = async (id: any) => {
  try {
    const res = await AxiosInstance.delete(`rentPost/delete/?postId=${id}`);
    console.log(res);
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

//COMMENTS
export const getComments = async (postId: number) => {
  try {
    const res = await AxiosInstance.get(`comment/getComments?postId=${postId}`);
    console.log(res);
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const sendComment = async (comment: CommentData) => {
  console.log(comment);
  try {
    const res = await AxiosInstance.post(`comment/post`, comment);
    console.log(res);
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const updateComment = async (comment: any, commentId: number) => {
  try {
    const res = await AxiosInstance.post(`comment/update?id=${commentId}`, {
      commentId: comment.commentId,
      writerId: comment.writerId,
      commentContents: comment.commentContents,
    });

    console.log(res);
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const deleteComment = async (commentId: number) => {
  try {
    const res = await AxiosInstance.post(`comment/delete?commentId=${commentId}`);

    console.log(res);
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log('error', error);
  }
};
