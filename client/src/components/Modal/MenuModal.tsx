import { ModalBackDrop, Container, Top, Bottom, Item } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { category } from '../../constants';
import { useContext } from 'react';
import { SearchResultContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import { searchCategoryKeyword } from '../../Utils';

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
    const result = await searchCategoryKeyword(e.target.innerText);
    if (result) {
      try {
        console.log(result);
        setSearchResultList(result.data.rentPosts);
        navigate('/search', {
          state: { category: e.target.innerText },
        });
      } catch {
        alert('죄송합니다 잠시 후 다시 시도해주세요 :)');
      }
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
