import { ModalBackDrop, Container, Top, Bottom, Item } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

interface PropsType {
    menuModal: boolean;
    setMenuModal: (state: boolean) => void;
}
const MenuModal = ({ setMenuModal }: PropsType) => {
    const closeModal = () => {
        setMenuModal(false);
    };
    const dummy: string[] = [
        '인기리스트',
        '캠핑용품',
        '디지털기기',
        '생활가전',
        '가구/인테리어',
        '스포츠/레져',
        '생활/주방',
        '유아동',
        '뷰티/미용',
        '취미/게임/음반',
        '도서',
        '반려동물용품',
    ];
    return (
        <ModalBackDrop onClick={closeModal}>
            <Container>
                <Top>
                    <div className="title">카테고리</div>
                    <FontAwesomeIcon
                        icon={faX}
                        onClick={closeModal}
                        className="icon"
                    />
                </Top>
                <Bottom>
                    {dummy.map((el, idx: number) => (
                        <Item key={idx}>{el}</Item>
                    ))}
                </Bottom>
            </Container>
        </ModalBackDrop>
    );
};

export default MenuModal;
