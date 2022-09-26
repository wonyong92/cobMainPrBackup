import { getPosts }  from '../../Utils/ApiCall';
import PostItem from '../../components/PostItem/PostItem';
import { useState, useEffect } from 'react';

const PostList = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then((res) => {
            setPosts(res.data);
            console.log(res);
        });
    }, []);

        

return (
    <>
        {posts.map((post) => ( 
            <PostItem
            category= {post}
            rentPostContents= {post}
            rentPostId= {post}
            rentPostName= {post}
            updateDate= {post}
            viewCount= {post}
            writeDate= {post}
            writerId= {post}
            rentStatus= {post}
            />
        ))}
    </>
);
};


export default PostList;
