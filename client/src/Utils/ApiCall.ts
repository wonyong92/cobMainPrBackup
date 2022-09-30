

import AxiosInstance from './AxiosInstance';
import { PostData } from '../pages/Post/PostWrite'; 
import { CommentData } from '../components/Comment/CommentWrite';

//POST
export const getPosts = async() => {
    
    try {
        const res = await AxiosInstance.get(`rentPost/posts`);
        console.log(res);
        return res.data;
        
        
    } catch (error) {
        console.log('error', error);
    }

}

export const getPost = async() => {
    
    try {
        const res = await AxiosInstance.post(`rentPost?postId=${1}`);
        // console.log(res);
        return res.data;
        
        
    } catch (error) {
        console.log('error', error);
    }

}


export const getImage = async (postId:any) => {
    try {
        // let imageArr = postId.map((el:any)=> {
        //     return AxiosInstance.get(`http://3.35.90.143:54130/rentPost/images/get?postId=${el}`).then((res)=>{
        //         return res.data;
        //     })
        //     });
        //     console.log(imageArr);
        const res = await AxiosInstance.get(`http://3.35.90.143:54130/rentPost/images/get?postId=${postId}`);
        console.log(res);
        console.log(res.data);
        const data = res.data
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

export const sendPost = async (post:PostData) => {
    try {
        const res = await AxiosInstance.post(`rentPost/post`,
        {
            category:  post.category,
            rentPostContents: post.rentPostContents,
            rentPostName: post.rentPostName,
            writerId: post.writerId,
            rentPrice: post.rentPrice,
            location: post.location,
          }
        );
        console.log(res);
        const data = res.data
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

export const sendImage = async (image: any) => {
    try {
        const res = await AxiosInstance.post(`rentPost/images/?id=${'1'}`,
        {
            image: image,
        });
        console.log(res);
        console.log(res.data);
        const data = res.data
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

export const updatePost = async (post: { title: any; content: any; price: any; category: any; location: any; }) => {
    try {
        const res = await AxiosInstance.put(`rentPost/update?id=${'1'}`,
        {
            title: post.title,
            content: post.content,
            price: post.price,
            category: post.category,
            location: post.location,
        });
        console.log(res);
        console.log(res.data);
        const data = res.data
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

export const deletePost = async (id: any) => {
    try {
        const res = await AxiosInstance.delete(`rentPost/delete/?id=${id}`);
        console.log(res);
        console.log(res.data);
        const data = res.data
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

//COMMENTS
export const getComments = async () => {
    try {
        const res = await AxiosInstance.get(`comment/getComments?postId=${1}`);
        console.log(res);
        console.log(res.data);
        const data = res.data
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

export const sendComment = async (comment: CommentData) => {
    console.log(comment);
    try {
        const res = await AxiosInstance.post(`comment/post?=`,
        {
            commentContents: comment.commentContents,
            postId: comment.targetPostId,
            writerId: comment.writerId,
        });
        console.log(res);
        console.log(res.data);
        const data = res.data
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

export const updateComment = async (comment: { content: any; }) => {
    try {
        const res = await AxiosInstance.put(`comment/update?id=${'1'}`,
        {
            content: comment.content,
        });
        console.log(res);
        console.log(res.data);
        const data = res.data
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

export const deleteComment = async (id: any) => {
    try {
        const res = await AxiosInstance.delete(`comment/delete?id=${id}`);
        console.log(res);
        console.log(res.data);
        const data = res.data
        return data;
    } catch (error) {
        console.log('error', error);
    }
}