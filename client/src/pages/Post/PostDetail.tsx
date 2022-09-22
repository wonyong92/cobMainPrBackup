
import React from 'react';
import styled from 'styled-components';
import PostItem from '../../components/PostItem';
import axios from 'axios';
import { useEffect, useState } from 'react';


const PostList = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/posts')
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <>
            {posts.map((post) => (
                <PostItem
                    // key={post.id}
                    // id={post.id}
                    // title={post.title}
                    // content={post.content}
                    // price={post.price}
                    // category={post.category}
                    // location={post.location}
                    // createdAt={post.createdAt}
                    // updatedAt={post.updatedAt}
                    // userId={post.userId}
                    // userName={post.userName}
                    // userImg={post.userImg}
                />
            ))}
        </>
    );
};

export default PostList;
