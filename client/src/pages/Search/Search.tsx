import styled from 'styled-components';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchResultContext } from '../../context/context';
import ListItem from '../../components/PostItem/ListItem';
import SearchFilter from '../../components/Search/SearchFilter';
import PageDescript from '../../components/Descript/PageDescript';

const Search = () => {
  const location = useLocation();
  const keyword: string | undefined = location?.state.keyword;
  const { searchResultList } = useContext(SearchResultContext);
  const [sortType, setSortType] = useState('latest');
  const [rentSortType, setRentSortType] = useState('available');
  const sortOptionList = [
    { value: 'latest', name: '최신순' },
    { value: 'popular', name: '인기순' },
  ];
  const rentSortOptionList = [
    { value: 'available', name: '렌트가능' },
    { value: 'rent', name: '렌트중' },
    { value: 'all', name: '모두' },
  ];
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
    const filterByRentStatus = (item: any) => {
      if (rentSortType === 'available') {
        return item.rentStatus === false;
      } else {
        return item.rentStatus === true;
      }
    };
    const copyList = searchResultList.slice();
    const filteredList = rentSortType === 'all' ? copyList : copyList.filter((el) => filterByRentStatus(el));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };
  const handleSortChange = (e: any) => {
    setSortType(e.target.value);
  };
  const handleFilterChange = (e: any) => {
    setRentSortType(e.target.value);
  };
  return (
    <Container>
      <Top>
        <Title>
          {keyword} 검색결과
          <span>{getProcessedList().length}</span>
        </Title>
        <FilterWrapper>
          <SearchFilter value={sortType} onChange={handleSortChange} optionList={sortOptionList} />
          <SearchFilter value={rentSortType} onChange={handleFilterChange} optionList={rentSortOptionList} />
        </FilterWrapper>
      </Top>
      {getProcessedList().length === 0 ? (
        <PageDescript
          title="검색결과가 없습니다 ㅜ_ㅜ"
          descript="현재 페이지에 해당하는 게시글이 존재하지 않습니다. 입력하신 단어의 철자가 정확한지 확인해 주세요 :)"
        />
      ) : (
        getProcessedList().map((el) => <ListItem data={el} key={el.rentPostId} />)
      )}
    </Container>
  );
};
export default Search;
const Container = styled.div`
  padding-top: 10px;

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
  margin-bottom: 10px;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  span {
    color: #464646;
    font-weight: 400;
    margin-left: 5px;
    font-size: 14px;
  }
`;
const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 145px;
  @media screen and (max-width: 500px) {
    width: 130px;
  }
`;
