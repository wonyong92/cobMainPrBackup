import CommentList from  '../../components/Comment/CommentList' ;
import CommentPost from '../../components/Comment/CommentPost';
import PostDetailItem from '../../components/PostItem/PostDetailItem';
import styled from 'styled-components';
import Button from '../../UI/button/Button';
import { useState,useEffect } from 'react';
import { getPosts} from '../../Utils/ApiCall';
import { PostItemDetailData } from '../../components/PostItem/PostDetailItem';


const PostDetail = () => {
    const [post, setPost] = useState<PostItemDetailData[]>([]);
   

    useEffect(() => {
        getPosts().then((res) => {
            console.log(res)
            console.log(res.rentPosts)
            setPost(res.rentPosts)
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <>
        <PostDetailItem data={post[0]}/> 
        <ContentContainer>
            <Button text='채팅하기' type='beige' width='middle'/>
        </ContentContainer>
        <CommentCount>댓글2</CommentCount>
        <CommentPost/>
        <CommentList/>
        </>
    );
    }

    const ContentContainer = styled.div`
    display:flex;
    flex-direction:row-reverse;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    padding-top:10px;
    margin-bottom: 1rem;
    padding-left: 20px;
    font-size: 1.2rem;
    line-height: 1.5;
    color: #495057;
    word-break: break-all;
    .button{
        display:flex;
        flex-direction:row-reverse;
        padding-right: 20px;
    }
    `;

    const CommentCount = styled.div`
    width: 100%;
    height:  30px;
    padding: 0 1rem;
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 15px;
    line-height: 1.5;
    color: #babcbe;
    word-break: break-all;
    `;

    export default PostDetail;