import ListItem from '../../components/PostItem/ListItem';
import PageNation from '../../components/Pagenation/PageNation';
import { sortOptionList, rentSortOptionList } from '../../constants';
import { handleFilterForCategorySearch } from '../../Utils';
import SearchFilter from '../../components/Search/SearchFilter';
import PageDescript from '../../components/Descript/PageDescript';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchResultContext } from '../../context/context';
import { Container, Top, Title, FilterWrapper, Bottom, ListBottom } from './style';
const SearchCategory = () => {
  const location = useLocation();
  const category: string | undefined = location?.state.category;
  const totalPostCount: number = location?.state.totalPostCount;
  const totalPages: number = location?.state.totalPages;
  const { searchResultList, setSearchResultList } = useContext(SearchResultContext);
  const [page, setPage] = useState(0);
  const [totalPost, setTotalPost] = useState(totalPostCount);
  const [rentSortType, setRentSortType] = useState('false');
  const [sortType, setSortType] = useState('writeDate');

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
  }, [rentSortType, sortType, setPage, page, category]);
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
      {searchResultList && searchResultList.length === 0 ? (
        <Bottom>
          <PageDescript
            title="검색결과가 없습니다 ㅜ_ㅜ"
            descript="현재 페이지에 해당하는 게시글이 존재하지 않습니다. 입력하신 단어의 철자가 정확한지 확인해 주세요 :)"
          />
        </Bottom>
      ) : (
        <ListBottom>
          {searchResultList && searchResultList.map((el) => <ListItem data={el} key={el.rentPostId} />)}
        </ListBottom>
      )}
    </Container>
  );
};
export default SearchCategory;
