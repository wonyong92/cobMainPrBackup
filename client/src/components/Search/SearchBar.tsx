import styled from 'styled-components';
import TextInput from '../../UI/input/TextInput';
import { ChangeEvent, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchResultContext } from '../../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { searchkeyword } from '../../Utils';

interface Props {
  keyword?: string;
  setKeyword?: (state: string) => void;
}
const SearchBar = ({ keyword, setKeyword }: Props) => {
  const { setSearchResultList } = useContext(SearchResultContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pathCondition = location.pathname === '/mypage' || location.pathname === '/myactivity';
  const handleKeywordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword && setKeyword(e.target.value);
  };
  const handleKeywordOnKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      handleSearchKeyword();
    }
  };

  const handleSearchKeyword = async () => {
    if (keyword) {
      const result = await searchkeyword(keyword);
      try {
        setSearchResultList(result);
        navigate('/search', {
          state: { keyword: keyword },
        });
        setKeyword && setKeyword('');
      } catch {
        alert('요청하신 정보를 불러올 수 없습니다. 잠시후 다시 시도해주세요 ㅜ_ㅜ');
      }
    }
  };
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
          <FontAwesomeIcon icon={faMagnifyingGlass} className="magnify" onClick={() => handleSearchKeyword} />
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
