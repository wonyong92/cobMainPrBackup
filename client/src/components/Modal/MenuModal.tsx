import { ModalBackDrop, Container, Top, Bottom, Item } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { category } from '../../constants';

interface PropsType {
  menuModal: boolean;
  setMenuModal: (state: boolean) => void;
}
const MenuModal = ({ setMenuModal }: PropsType) => {
  const closeModal = () => {
    setMenuModal(false);
  };
  console.log(category);
  return (
    <ModalBackDrop onClick={closeModal}>
      <Container>
        <Top>
          <div className="title">카테고리</div>
          <FontAwesomeIcon icon={faX} onClick={closeModal} className="icon" />
        </Top>
        <Bottom>
          {category.map((el: any) => (
            <>
              <Item key={el.cid}>{el.name}</Item>
            </>
          ))}
        </Bottom>
      </Container>
    </ModalBackDrop>
  );
};

export default MenuModal;
