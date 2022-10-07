import { getPosts } from '../../Utils/ApiCall';
import PostItem from '../../components/PostItem/PostItem';
import { useState, useCallback } from 'react';
import styled from 'styled-components';
import SearchFilter from '../../components/Search/SearchFilter';
import { sortOptionList } from '../../constants';
import { ItemContainer } from '../Main/Main';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface Props {
  ref?: React.MutableRefObject<HTMLDivElement>;
}

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState('writeDate');

  const fetchPosts = useCallback(async () => {
    getPosts(sortType).then((res) => {
      //   console.log(res.rentPosts);
      setPosts(res.rentPosts);
    });
  }, [sortType]);

  const setObservatingTarget = useIntersectionObserver(fetchPosts);

  const handleSortChange = (e: any) => {
    setSortType(e.target.value);
  };

  return (
    <>
      <Top>
        <HeadRow>
          <div>오늘은 뭐 빌리지?</div>
        </HeadRow>
        <SearchFilter value={sortType} onChange={handleSortChange} optionList={sortOptionList} />
      </Top>
      <ItemContainer>
        {posts.map((el: any) => (
          <PostItem data={el} key={el.rentPostId} />
        ))}
      </ItemContainer>
      <div ref={setObservatingTarget} />
    </>
  );
};

const HeadRow = styled.div`
  width: 80%;
  text-align: left;
  font-size: 22px;
  font-weight: 600;
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