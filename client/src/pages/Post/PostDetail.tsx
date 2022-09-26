// import CommentList from '../../components/CommentList';
import CommentPost from '../../components/Comment/CommentPost';
import PostDetailItem from '../../components/PostItem/PostDetailItem';
import styled from 'styled-components';
import Button from '../../UI/button/Button';
import { Z_FIXED } from 'zlib';

const PostDetail = () => {
  
    
    return (
        <>
        <PostDetailItem category={''} rentPostContents={''} rentPostId={0} rentPostName={''} updateDate={''} viewCount={0} writeDate={''} writerId={0} rentStatus={''} price={''}/>
        <ContentContainer>
            <Button text='채팅하기' type='beige' width='middle'/>
            <div>안녕하세요 작년에 구매한 캠핑용품입니다.<br></br>레전드 브랜드 캠핑용품이구요,<br></br>하루에 5만원 총 15만원입니다. 제품구입하시면 300만원입니다. 자주 사용하시는게 아니시라면 구매비용을 절약하실수있습니다.<br></br>감사합니다.</div>
        </ContentContainer>
        <CommentCount>댓글2</CommentCount>
        <CommentPost/>
        {/* <CommentList/> */}
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