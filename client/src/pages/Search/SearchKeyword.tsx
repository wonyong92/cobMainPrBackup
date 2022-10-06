import ListItem from '../../components/PostItem/ListItem';
import PageNation from '../../components/Pagenation/PageNation';
import { sortOptionList, rentSortOptionList } from '../../constants';
import { handleFilterForKeywordSearch } from '../../Utils';
import SearchFilter from '../../components/Search/SearchFilter';
import PageDescript from '../../components/Descript/PageDescript';
import { useContext, useEffect, useState } from 'react';
import { Container, Top, Title, FilterWrapper, Bottom } from './style';
import { useLocation } from 'react-router-dom';
import { SearchResultContext } from '../../context/context';

const SearchKeyword = () => {
  const location = useLocation();
  const keyword: string | undefined = location?.state.keyword;
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
  const searchForKeyword = async () => {
    if (keyword) {
      const data = {
        page: page - 1,
        size: 10,
        sort: sortType,
      };
      const result = await handleFilterForKeywordSearch(keyword, rentSortType, data);
      try {
        if (result) {
          // console.log('키워드페이지결과임');
          // console.log(result);
          setTotalPost(result.data.totalEntity);
          setSearchResultList(result.data.rentPosts);
        }
      } catch {
        alert('죄송합니다. 잠시후 다시 시도해주세요 :)');
      }
    }
  };
  useEffect(() => {
    searchForKeyword();
  }, [rentSortType, sortType, setPage, page, keyword]);
  return (
    <Container>
      <Top>
        <Title>
          {keyword} 검색결과
          <span>{totalPostCount}</span>
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
        {searchResultList.length === 0 ? (
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
export default SearchKeyword;
