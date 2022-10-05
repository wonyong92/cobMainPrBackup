import styled from 'styled-components';
import ListItem from '../../components/PostItem/ListItem';
import PageNation from '../../components/Pagenation/PageNation';
import { sortOptionList, rentSortOptionList } from '../../constants';
import { handleFilterForCategorySearch } from '../../Utils';
import SearchFilter from '../../components/Search/SearchFilter';
import PageDescript from '../../components/Descript/PageDescript';
import { useContext, useEffect, useState } from 'react';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { useLocation } from 'react-router-dom';
import { SearchResultContext } from '../../context/context';
const SearchCategory = () => {
  const location = useLocation();
  const category: string | undefined = location?.state.category;
  const totalPostCount: number = location?.state.totalPostCount;
  const totalPages: number = location?.state.totalPages;
  const { searchResultList, setSearchResultList } = useContext(SearchResultContext);
  const [sortType, setSortType] = useState('writeDate');
  const [rentSortType, setRentSortType] = useState('false');
  const [page, setPage] = useState(0);
  const [totalPost, setTotalPost] = useState(totalPostCount);
  const handleSortChange = (e: any) => {
    setSortType(e.target.value);
  };
  const handleFilterChange = (e: any) => {
    setRentSortType(e.target.value);
  };
  const increasePage = () => {
    setPage(page + 1);
  };
  const decreasePage = () => {
    setPage(page - 1);
  };
  //필터변경시 api요청
  const searchFortCategoryKeyword = async () => {
    if (category) {
      const result = await handleFilterForCategorySearch(sortType, page, category, rentSortType);
      if (result) {
        try {
          setTotalPost(result.data.totalEntity);
          setSearchResultList(result.data.rentPosts);
        } catch {
          alert('죄송합니다 잠시 후 다시 시도해주세요 :)');
        }
      }
    }
  };
  //필터
  useEffect(() => {
    searchFortCategoryKeyword();
  }, [rentSortType, sortType, setPage, page]);
  return (
    <Container>
      <Top>
        <Title>
          {category} 검색결과
          <span>{totalPost ? totalPost : totalPostCount}</span>
        </Title>
        <FilterWrapper>
          <SearchFilter value={sortType} onChange={handleSortChange} optionList={sortOptionList} />
          <SearchFilter value={rentSortType} onChange={handleFilterChange} optionList={rentSortOptionList} />
        </FilterWrapper>
      </Top>
      <PageNation
        page={page}
        totalPages={totalPages}
        increasePage={increasePage}
        decreasePage={decreasePage}
      />
      <Bottom>
        {searchResultList && searchResultList.length === 0 ? (
          <PageDescript
            title="검색결과가 없습니다 ㅜ_ㅜ"
            descript="현재 페이지에 해당하는 게시글이 존재하지 않습니다. 입력하신 단어의 철자가 정확한지 확인해 주세요 :)"
          />
        ) : (
          searchResultList && searchResultList.map((el) => <ListItem data={el} key={el.rentPostId} />)
        )}
      </Bottom>
    </Container>
  );
};
export default SearchCategory;
const Container = styled.div`
  width: 60%;
  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
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
