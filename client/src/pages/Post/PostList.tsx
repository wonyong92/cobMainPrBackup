import { getPosts }  from '../../Utils/ApiCall';
import PostItem, { PostItemData } from '../../components/PostItem/PostItem';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const PostList = () => {

    const [posts, setPosts] = useState<PostItemData[]>([]);

    useEffect(() => {
        getPosts().then((res) => {
            setPosts(res.rentPosts);
        });
    }, []);


        

return (
    <>
        <HeadRow>
        <h2>인기리스트</h2>
        </HeadRow>
        {posts && posts.map((el, idx) => ( 
            <PostItem
                data={el} key={idx} />
                       
        ))}
    </>
);
};

const HeadRow = styled.div``;

export default PostList;
