// import CommentList from '../../components/CommentList';
import CommentPost from '../../components/CommentPost';
import PostItem from '../../components/PostItem';

const PostDetail = () => {
  
    
    return (
        <>
        <PostItem/>
        <div>안녕하세요 작년에 구매한 캠핑용품입니다.<br></br>레전드 브랜드 캠핑용품이구요,<br></br>하루에 5만원 총 15만원입니다. 제품구입하시면 300만원입니다. 자주 사용하시는게 아니시라면 구매비용을 절약하실수있습니다.<br></br>감사합니다.</div>
        <span>댓글2</span>
      
        <CommentPost/>
        {/* <CommentList/> */}
        </>
    );
    }

    export default PostDetail;