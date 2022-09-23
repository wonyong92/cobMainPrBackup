
import PostItem from '../../components/PostItem';
import axios from 'axios';
import { useEffect } from 'react';

const PostList = () => {

// const [posts, setPosts] = useState([]);
// useEffect(() => {
//     axios.get('http://localhost:4000/posts')
//         .then((res) => {
//             setPosts(res.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }, []);


return (
    <>
        {/* {posts.map((post) => ( */}
            <PostItem
                // key={post}
                // id={post.id}
                // title={post}
                // content={post}
                // price={post}
                // category={post}
                // location={post}
                // createdAt={post}
                // updatedAt={post}
                // userId={post}
                // userName={post}
                // userImg={post}
            />
        {/* ))} */}
    </>
);
};


export default PostList;
