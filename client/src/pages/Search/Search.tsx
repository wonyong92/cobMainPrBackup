import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchResultContext } from '../../context/context';
import ListItem from '../../components/PostItem/ListItem';
import SearchFilter from '../../components/Search/SearchFilter';
import PageDescript from '../../components/Descript/PageDescript';
import axios from 'axios';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import PageNation from '../../components/Pagenation/PageNation';

const Search = () => {
  const location = useLocation();
  const keyword: string | undefined = location?.state.keyword;
  const category: string | undefined = location?.state.category;
  const { searchResultList, setSearchResultList } = useContext(SearchResultContext);
  const [sortType, setSortType] = useState('WRITE_DATE');
  const [rentSortType, setRentSortType] = useState('false');
  const [page, setPage] = useState(1);
  const [totalPost, setTotalPost] = useState(1);
  const totalPage = Math.ceil(totalPost / 6);
  const sortOptionList = [
    { value: 'writeDate', name: '최신순' },
    { value: 'viewCount', name: '인기순' },
  ];
  const rentSortOptionList = [
    { value: 'false', name: '렌트가능' },
    { value: 'true', name: '렌트중' },
  ];

  const handleSortChange = (e: any) => {
    setSortType(e.target.value);
  };
  const handleFilterChange = (e: any) => {
    setRentSortType(e.target.value);
  };
  const handleSearchKeyword = async () => {
    const data = {
      sort: sortType,
      page: page - 1,
      size: 5,
    };
    try {
      const res = await axios.post(
        `http://3.35.90.143:54130/rentPost/search?phrase=${keyword}&rentStatus=${rentSortType}`,
        data,
        {
          withCredentials: false,
        },
      );
      setTotalPost(res.data.length);
      setSearchResultList(res.data);
    } catch {
      alert('죄송합니다. 잠시후 다시 시도해주세요 :)');
    }
  };
  const handleCategoryKeyword = async () => {
    try {
      const res = await axios.get(
        `http://3.35.90.143:54130/rentPost/posts?category=${category}&rentStatus=${rentSortType}&sort=${sortType}&page=${page}`,
        {
          withCredentials: false,
        },
      );
      setSearchResultList(res.data.rentPosts);
    } catch {
      alert('죄송합니다 잠시 후 다시 시도해주세요 :)');
    }
  };
  useDidMountEffect(() => {
    if (keyword !== undefined) {
      handleSearchKeyword();
    } else {
      handleCategoryKeyword();
    }
  }, [rentSortType, sortType, setPage]);
  const increasePage = () => {
    setPage(page + 1);
  };
  const decreasePage = () => {
    setPage(page - 1);
  };
  return (
    <Container>
      <Top>
        <Title>
          {keyword ? keyword : category} 검색결과
          <span>{searchResultList.length}</span>
        </Title>
        <FilterWrapper>
          <SearchFilter value={sortType} onChange={handleSortChange} optionList={sortOptionList} />
          <SearchFilter value={rentSortType} onChange={handleFilterChange} optionList={rentSortOptionList} />
        </FilterWrapper>
      </Top>
      <PageNation page={page} totalPage={totalPage} increasePage={increasePage} decreasePage={decreasePage} />
      <Bottom>
        {searchResultList.length === 0 ? (
          <PageDescript
            title="검색결과가 없습니다 ㅜ_ㅜ"
            descript="현재 페이지에 해당하는 게시글이 존재하지 않습니다. 입력하신 단어의 철자가 정확한지 확인해 주세요 :)"
          />
        ) : (
          searchResultList.map((el) => <ListItem data={el} key={el.rentPostId} />)
        )}
      </Bottom>
    </Container>
  );
};
export default Search;
const Container = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 70%;
  @media screen and (max-width: 500px) {
    width: 95%;
  }
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 14px;
  span {
    color: #464646;
    font-weight: 400;
    margin-left: 5px;
    font-size: 13px;
  }
`;
const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 130px;
`;
const Bottom = styled.div``;
