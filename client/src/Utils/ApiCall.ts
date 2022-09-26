
import AxiosInstance from './AxiosInstance';

export const getPosts = async () => {
    try {
        const res = await AxiosInstance.get('rentPost/posts');
    console.log(res);
    console.log(res.data);
    const data = res.data
    return data;
        
    } catch (error) {
        console.log('error', error);
    }
    
  
};

 
export const sendPost = async (post: { title: any; content: any; price: any; category: any; location: any; }) => {
    
    try {
        const res = await AxiosInstance.post(`rentPost/pos/?writerid=${'1'}`,
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

export const getImage = async (id: any) => {
    try {
        const res = await AxiosInstance.get(`rentPost/image/?id=${id}`);
        console.log(res);
        console.log(res.data);
        const data = res.data
        return data;
    } catch (error) {
        console.log('error', error);
    }
}