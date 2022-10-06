import { getPosts } from '../../Utils/ApiCall';
import PostItem from '../../components/PostItem/PostItem';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchFilter from '../../components/Search/SearchFilter';
import { sortOptionList } from '../../constants';
import { ItemContainer } from '../Main/Main';
// import { SearchResultContext } from '../../context/context';

const PostList = () => {
  // const { searchResultList, setSearchResultList } = useContext(SearchResultContext);
  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState('writeDate');

  useEffect(() => {
    getPosts(sortType).then((res) => {
      //   console.log(res.rentPosts);
      setPosts(res.rentPosts);
    });
  }, [sortType]);

  const handleSortChange = (e: any) => {
    setSortType(e.target.value);
  };

  return (
    <>
      <Top>
        <HeadRow>
          <div>인기리스트</div>
        </HeadRow>
        <SearchFilter value={sortType} onChange={handleSortChange} optionList={sortOptionList} />
      </Top>
      <ItemContainer>
        {posts.map((el: any) => (
          <PostItem data={el} key={el.rentPostId} />
        ))}
      </ItemContainer>
    </>
  );
};

const HeadRow = styled.div`
  width: 80%;
  text-align: left;
  font-size: 18px;
  font-weight: 500;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;

export default PostList;
