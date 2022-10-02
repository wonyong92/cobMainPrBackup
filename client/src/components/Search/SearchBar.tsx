import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import TextInput from '../../UI/input/TextInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useContext } from 'react';
import axios from 'axios';
import { SearchResultContext } from '../../context/context';

interface Props {
  keyword?: string;
  setKeyword?: (state: string) => void;
}
const SearchBar = ({ keyword, setKeyword }: Props) => {
  const { setSearchResultList, searchResultList } = useContext(SearchResultContext);
  const navigate = useNavigate();
  const handleKeywordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword && setKeyword(e.target.value);
    console.log(keyword);
  };
  const handleKeywordOnKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      handleSearchKeyword();
    }
  };
  const handleSearchKeyword = () => {
    const data = {
      page: 0,
      size: 20,
      sort: 'VIEW_COUNT',
    };
    axios
      .post(`http://3.35.90.143:54130/rentPost/search?phrase=${keyword}`, data, {
        withCredentials: false,
      })
      .then((res) => {
        setSearchResultList([...searchResultList, res.data]);
        console.log(res.data);
        navigate('/search', {
          state: { keyword: keyword },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const location = useLocation();
  const pathCondition = location.pathname === '/mypage' || location.pathname === '/myactivity';
  return (
    <Container>
      {pathCondition ? null : (
        <>
          <TextInput
            type="text"
            value={keyword ? keyword : ''}
            onChange={handleKeywordInputChange}
            onKeyup={handleKeywordOnKeyUp}
            placeholder="검색어를 입력해주세요"
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="magnify" onClick={handleSearchKeyword} />
        </>
      )}
    </Container>
  );
};
export default SearchBar;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
  input {
    margin-top: 10px;
    min-width: 330px;
    text-indent: 5px;
    font-size: 12px;
  }
  .magnify {
    position: relative;
    top: 14px;
    right: 30px;
    color: #c0bec8;
    cursor: pointer;
  }
`;
