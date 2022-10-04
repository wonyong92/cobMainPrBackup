import { getPosts }  from '../../Utils/ApiCall';
import PostItem from '../../components/PostItem/PostItem';
import { useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import SearchFilter from '../../components/Search/SearchFilter';
import { sortOptionList} from '../../constants';
import { SearchResultContext } from '../../context/context';


const PostList = () => {
    const { searchResultList, setSearchResultList } = useContext(SearchResultContext);
    const [sortType, setSortType] = useState('WRITE_DATE');
    
    useEffect(() => {
        getPosts(sortType).then((res) => {
            setSearchResultList(res.rentPosts);
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
        {searchResultList.map((el) => <PostItem data={el} key={el.rentPostId} />
                       
        )}
    </>
);
};

const HeadRow = styled.div``;

export default PostList;
