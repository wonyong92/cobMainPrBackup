interface Props {
  isCategory?: boolean;
  totalPostCount: number;
  keyword: string;
  category: string;
}
const SearchResult = () => {
  return (
    <>
      {/* <Top>
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
      {searchResultList.length === 0 ? (
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
      )} */}
    </>
  );
};
export default SearchResult;
