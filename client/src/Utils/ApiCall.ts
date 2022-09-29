

import AxiosInstance from './AxiosInstance';
import { PostData } from '../pages/Post/PostWrite'; 

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



export const getImage = async (postId:any) => {
    try {
        // let imageArr = postId.map((el:any)=> {
        //     return AxiosInstance.get(`http://3.39.180.45:56178/rentPost/images/get?postId=${el}`).then((res)=>{
        //         return res.data;
        //     })
        //     });
        //     console.log(imageArr);
        const res = await AxiosInstance.get(`http://3.39.180.45:56178/rentPost/images/get?postId=${postId}`);
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
    rentPostName: post.rentPostName,
    rentPostContents: post.rentPostContents,
    writerId: post.writerId,
    category: post.category,
    rentPrice: post.rentPrice,
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
        const res = await AxiosInstance.get(`comment/${1}`);
        console.log(res);
        console.log(res.data);
        const data = res.data
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

export const sendComment = async (comment: { content: any; }) => {
    try {
        const res = await AxiosInstance.post(`comment/post?id=${'1'}`,
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