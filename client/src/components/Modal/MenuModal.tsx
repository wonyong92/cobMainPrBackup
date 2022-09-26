import styled from 'styled-components';
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
const ModalBackDrop = styled.div`
    display: flex;
    position: fixed;
    z-index: 999;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;

    @media screen and (max-width: 500px) {
        position: fixed;
        z-index: 999;
        top: 10px;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: center;
    }
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    top: 60px;
    left: 80px;
    padding: 10px;
    height: 40px;
    width: 100%;
    background-color: white;
    opacity: 0.8;

    @media screen and (max-width: 500px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 340px;
        min-height: 420px;
        position: relative;
        top: 10px;
        left: 0.01px;
        opacity: 1;
        background-color: white;
        box-shadow: rgba(100, 100, 100, 0.1) 1px -1px 3px 2px;
    }
`;
const Top = styled.div`
    display: none;
    @media screen and (max-width: 500px) {
        display: flex;
        align-items: center;
        padding: 10px 0px;
        border-bottom: 1px solid #f1efef;
        width: 90%;
        margin-top: 5px;
        color: #282828;
        .title {
            font-weight: 600;
            font-size: 15px;
            width: 95%;
            text-align: center;
        }
        .icon {
            width: 5%;
            cursor: pointer;
        }
    }
`;
const Bottom = styled.div`
    display: flex;

    @media screen and (max-width: 500px) {
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        min-width: 280px;
        align-items: flex-start;
    }
`;

const Item = styled.div`
    cursor: pointer;
    color: black;
    font-size: 14px;
    font-weight: 500;
    margin-right: 10px;
    &:hover {
        color: #96d1cc;
        transition: 0.2s;
    }
    @media screen and (max-width: 500px) {
        cursor: pointer;
        color: #464646;
        font-size: 14px;
        font-weight: 300;
        padding-top: 10px;
    }
`;
