import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import TextInput from '../../UI/input/TextInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import PostItem from '../PostItem/PostItem';

interface PropsType {
  keyword: string;
  setKeyword: (state: string) => void;
}
interface ISearchQuery {
  category: string;
  rentStatus: string;
}
const SearchBar = ({ keyword, setKeyword }: PropsType) => {
  const token = localStorage.getItem('token');
  const [result, setResult] = useState();
  const handleKeywordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    console.log(keyword);
  };

  const handleSearchKeyword = () => {
    if (token) {
      const data = {
        page: 1,
        size: 1,
        sort: 'VIEW_COUNT',
      };
      axios
        .post(`http://3.35.90.143:54130/rentPost/search?phrase=${keyword}`, data)
        .then((res) => {
          console.log(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const location = useLocation();
  const pathCondition = location.pathname === '/mypage' || location.pathname === '/myactivity';
  return (
    <Container>
      {pathCondition ? null : (
        <>
          <TextInput
            type="text"
            value={keyword}
            onChange={handleKeywordInputChange}
            placeholder="검색어를 입력해주세요"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="magnify"
            onClick={handleSearchKeyword}
          />
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
