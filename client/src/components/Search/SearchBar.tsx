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
        setSearchResultList(result?.data.rentPosts);
        navigate('/search/keyword', {
          state: {
            keyword: keyword,
            totalPages: result?.data.totalPages,
            totalPostCount: result?.data.totalEntity,
          },
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
  align-items: center;
  padding-left: 15px;
  input {
    min-width: 340px;
    height: 32px;
    text-indent: 5px;
    font-size: 13px;
  }
  .magnify {
    position: relative;
    top: 0px;
    right: 30px;
    color: #c0bec8;
    cursor: pointer;
  }
  @media screen and (max-width: 500px) {
    margin: 10px 0;
    input {
      min-width: 330px;
      height: 30px;
      font-size: 12px;
      padding-bottom: 2px;
    }
  }
`;
