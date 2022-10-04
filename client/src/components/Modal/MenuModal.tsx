import { ModalBackDrop, Container, Top, Bottom, Item } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { category } from '../../constants';
import { useContext } from 'react';
import { SearchResultContext } from '../../context/context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Props {
  setMenuModal?: (state: boolean) => void;
}
const MenuModal = ({ setMenuModal }: Props) => {
  const navigate = useNavigate();
  const { setSearchResultList } = useContext(SearchResultContext);
  const closeModal = () => {
    setMenuModal && setMenuModal(false);
  };

  const getCategoryPosts = async (e: any) => {
    try {
      const res = await axios.get(
        `http://3.35.90.143:54130/rentPost/posts?category=${e.target.innerText}&rentStatus=false&sort=writeDate&size=10&page=0`,
        {
          withCredentials: false,
        },
      );
      setSearchResultList(res.data.rentPosts);
      navigate('/search', {
        state: { category: e.target.innerText },
      });
    } catch {
      alert('죄송합니다 잠시 후 다시 시도해주세요 :)');
    }
  };

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
              <div onClick={(e) => getCategoryPosts(e)}>{el.name}</div>
            </Item>
          ))}
        </Bottom>
      </Container>
    </ModalBackDrop>
  );
};

export default MenuModal;
