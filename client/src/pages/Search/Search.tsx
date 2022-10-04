import styled from 'styled-components';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchResultContext } from '../../context/context';
import ListItem from '../../components/PostItem/ListItem';
import SearchFilter from '../../components/Search/SearchFilter';
import PageDescript from '../../components/Descript/PageDescript';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import PageNation from '../../components/Pagenation/PageNation';
import { sortOptionList, rentSortOptionList } from '../../constants';
import { handleFilterForCategorySearch, handleFilterForKeywordSearch } from '../../Utils';

const Search = () => {
  const location = useLocation();
  const keyword: string | undefined = location?.state.keyword;
  const category: string | undefined = location?.state.category;
  const { searchResultList, setSearchResultList } = useContext(SearchResultContext);
  const [sortType, setSortType] = useState('writeDate');
  const [rentSortType, setRentSortType] = useState('false');
  const [page, setPage] = useState(0);
  const [totalPost, setTotalPost] = useState(0);
  const totalPage = Math.ceil(totalPost / 10);

  const handleSortChange = (e: any) => {
    setSortType(e.target.value);
  };
  const handleFilterChange = (e: any) => {
    setRentSortType(e.target.value);
  };
  const searchForKeyword = async () => {
    if (keyword) {
      const result = await handleFilterForKeywordSearch(sortType, page, keyword, rentSortType);
      try {
        if (result) {
          console.log(result);
          setTotalPost(result.data.length);
          setSearchResultList(result.data);
        }
      } catch {
        alert('죄송합니다. 잠시후 다시 시도해주세요 :)');
      }
    }
  };
  const searchFortCategoryKeyword = async () => {
    if (category) {
      const result = await handleFilterForCategorySearch(sortType, page, category, rentSortType);
      if (result) {
        try {
          console.log(result);
          setTotalPost(result.data.totalPages);
          setSearchResultList(result.data.rentPosts);
        } catch {
          alert('죄송합니다 잠시 후 다시 시도해주세요 :)');
        }
      }
    }
  };
  useDidMountEffect(() => {
    if (keyword !== undefined) {
      searchForKeyword();
    } else {
      searchFortCategoryKeyword();
    }
  }, [rentSortType, sortType, setPage, page]);
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
  padding: 10px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* width: 70%; */
  @media screen and (max-width: 500px) {
    /* width: 95%; */
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
