import { getPosts }  from '../../Utils/ApiCall';
import PostItem, { PostItemData } from '../../components/PostItem/PostItem';
import { useState, useEffect} from 'react';
import styled from 'styled-components';
import SearchFilter from '../../components/Search/SearchFilter';
import { SearchResultContext } from '../../context/context';
import { useContext } from 'react';


const PostList = () => {

    const [posts, setPosts] = useState<PostItemData[]>([]);
    const [sortType, setSortType] = useState('latest');
    const { searchResultList } = useContext(SearchResultContext);
    
    useEffect(() => {
        getPosts().then((res) => {
            setPosts(res.rentPosts);
        });
    }, []);

    const sortOptionList = [
        { value: 'latest', name: '최신순' },
        { value: 'popular', name: '인기순' },
      ];
        
      const handleSortChange = (e: any) => {
        setSortType(e.target.value);
      };
      const getProcessedList = () => {
        const compare = (a: any, b: any) => {
          if (sortType === 'latest') {
            const aDate = new Date(a.updateDate).getTime();
            const bDate = new Date(b.updateDate).getTime();
            return bDate - aDate;
          } else {
            return b.viewCount - a.viewCount;
          }
        };
        const copyList = searchResultList.slice();
        const sortedList = copyList.sort(compare);
        return sortedList;
    };

    return (
    <>
       
    <SearchFilter value={sortType} onChange={handleSortChange} optionList={sortOptionList} />
        <HeadRow>
        <h2>인기리스트</h2>
        </HeadRow>
        {posts && (
        getProcessedList().map((el) => <PostItem data={el} key={el.rentPostId} />)
      )}
    </>
);
};


const HeadRow = styled.div``;

export default PostList;
