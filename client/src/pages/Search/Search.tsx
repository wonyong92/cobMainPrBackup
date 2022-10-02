import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchResultContext } from '../../context/context';

const Search = () => {
  const location = useLocation();
  const keyword: string | undefined = location?.state.keyword;
  const { searchResultList } = useContext(SearchResultContext);
  return (
    <div>
      <div>{keyword} 검색결과</div>
      {searchResultList.map((el) => (
        <div key={el.rentPostId}>
          <div>{el.rentPostName}</div>
        </div>
      ))}
    </div>
  );
};
export default Search;
