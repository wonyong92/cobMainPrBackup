import { ModalBackDrop, Container, Top, Bottom, Item } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { category } from '../../constants';
import { useContext } from 'react';
import { SearchResultContext } from '../../context/context';
import axios from 'axios';

interface Props {
  setMenuModal?: (state: boolean) => void;
}
const MenuModal = ({ setMenuModal }: Props) => {
  const { setSearchResultList } = useContext(SearchResultContext);
  const token = localStorage.getItem('token');
  const closeModal = () => {
    setMenuModal && setMenuModal(false);
  };
  const clickedCategory = 'categoryCamping';
  const handleSearchKeyword = () => {
    if (token) {
      const data = {
        page: 1,
        size: 1,
        sort: 'VIEW_COUNT',
      };
      axios
        .post(`http://3.35.90.143:54130/rentPost/search?phrase=''&category=${clickedCategory}`, data, {
          withCredentials: false,
        })
        .then((res) => {
          setSearchResultList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const getClickedCategory = () => {};
  return (
    <ModalBackDrop onClick={closeModal}>
      <Container>
        <Top>
          <div className="title">카테고리</div>
          <FontAwesomeIcon icon={faX} onClick={closeModal} className="icon" />
        </Top>
        <Bottom>
          {category.map((el: any) => (
            <Item key={el.cid}>
              <div onClick={() => getClickedCategory}>{el.name}</div>
            </Item>
          ))}
        </Bottom>
      </Container>
    </ModalBackDrop>
  );
};

export default MenuModal;
