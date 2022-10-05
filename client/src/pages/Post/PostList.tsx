import { getPosts }  from '../../Utils/ApiCall';
import PostItem from '../../components/PostItem/PostItem';
import { useState, useEffect} from 'react';
import styled from 'styled-components';
import SearchFilter from '../../components/Search/SearchFilter';
import { sortOptionList} from '../../constants';
// import { SearchResultContext } from '../../context/context';


const PostList = () => {
    // const { searchResultList, setSearchResultList } = useContext(SearchResultContext);
    const [posts, setPosts] = useState([]);
    const [sortType, setSortType] = useState('writeDate');
    
    useEffect(() => {
        getPosts(sortType).then((res) => {
            console.log(res.rentPosts);
            setPosts(res.rentPosts);
        });
    }, [sortType]);

        
      const handleSortChange = (e: any) => {
      setSortType(e.target.value);
      };
      

return (
    <>
    <SearchFilter value={sortType} onChange={handleSortChange} optionList={sortOptionList} />
        <HeadRow>
        <h2>인기리스트</h2>
        </HeadRow>
        {posts.map((el:any) => <PostItem data={el} key={el.rentPostId} />
                       
        )}
    </>
);
};

const HeadRow = styled.div``;

export default PostList;
