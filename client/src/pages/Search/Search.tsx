import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchResultContext } from '../../context/context';

const Search = () => {
  const location = useLocation();
  const keyword = location.state.keyword;
  const { searchResultList } = useContext(SearchResultContext);
  console.log(searchResultList);
  return (
    <div>
      <div>{keyword} 검색결과</div>
    </div>
  );
};
export default Search;
