import styled from 'styled-components';
import { ReactComponent as Logo } from '../../asessts/img/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faUser,
    faCirclePlus,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MenuModal from '../Modal/MenuModal';
import TextInput from '../../UI/input/TextInput';
import TextButton from '../../UI/button/TextButton';
import Button from '../../UI/button/Button';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathCondition =
        location.pathname === '/mypage' || location.pathname === '/myactiviery';
    const [menuModal, setMenuModal] = useState(false);
    const [keyword, setKeyword] = useState<string>('');
    return (
        <MyHeader>
            <Top>
                <LogoWrapper
                    menuModal={menuModal}
                    onClick={() => navigate(`/`)}
                >
                    <LogoSVG />
                    <div className="title">빌리지뭐</div>
                    <div
                        className="category"
                        onClick={() => setMenuModal(true)}
                    >
                        카테고리
                    </div>
                </LogoWrapper>
                <Icons>
                    <FontAwesomeIcon
                        icon={faCirclePlus}
                        onClick={() => navigate(`/postwrite`)}
                        className="icon"
                    />
                    <FontAwesomeIcon
                        icon={faBars}
                        onClick={() => setMenuModal(true)}
                        className="icon"
                    />
                    <FontAwesomeIcon
                        icon={faUser}
                        onClick={() => navigate(`/mypage`)}
                        className="icon"
                    />
                </Icons>
            </Top>
            {pathCondition ? null : (
                <Bottom>
                    <TextInput
                        type="text"
                        value={keyword}
                        input="??"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="magnify"
                        onClick={() => console.log('hi')}
                    />
                </Bottom>
            )}
            {menuModal ? (
                <MenuModal menuModal={menuModal} setMenuModal={setMenuModal} />
            ) : null}
            <DesktopBtnWrapper>
                <TextButton
                    isGray={true}
                    btnText={'로그인'}
                    onClick={() => navigate('/login')}
                />
                <TextButton
                    isGray={true}
                    btnText={'회원가입'}
                    onClick={() => navigate('/signup')}
                />
                <Button text={'글쓰기 +'} width={'short'} />
            </DesktopBtnWrapper>
        </MyHeader>
    );
};
export default Header;

const MyHeader = styled.header`
    width: 100vw;
    display: flex;
    justify-content: space-around;
    padding-bottom: 5px;
    border-bottom: 0.5px solid #f5f5f5;
    @media screen and (max-width: 500px) {
        flex-direction: column;
        display: flex;
        align-items: center;
        padding-top: 5px;
        padding-bottom: 10px;
    }
`;
const Top = styled.div`
    display: flex;
    @media screen and (max-width: 500px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 350px;
        height: 40px;
    }
`;
const LogoWrapper = styled.div<{
    menuModal: boolean;
}>`
    display: flex;
    align-items: center;
    cursor: pointer;
    .title {
        font-size: 22px;
        font-weight: 500;
        padding-top: 5px;
        margin-right: 10px;
    }

    .category {
        padding-top: 15px;
        padding-bottom: 5px;
        color: ${(props) => (props.menuModal === true ? '#95d1cc' : '#464646')};
        border-bottom: ${(props) =>
            props.menuModal === true
                ? '3px solid #95d1cc'
                : '3px solid transparent'};
    }
    .category:hover {
        color: #95d1cc;
    }
    @media screen and (max-width: 500px) {
        cursor: pointer;
        .title {
            font-size: 18px;
            padding-top: 3px;
        }
        .category {
            display: none;
        }
    }
`;
const LogoSVG = styled(Logo)`
    margin: 0 10px;
`;
const Icons = styled.div`
    display: none;
    @media screen and (max-width: 500px) {
        display: inline-block;
        margin-right: 10px;
        .icon {
            cursor: pointer;
            color: #95d1cc;
            width: 25px;
            height: 20px;
            margin-left: 10px;
        }
    }
`;
const Bottom = styled.div`
    display: flex;
    justify-content: center;
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

const DesktopBtnWrapper = styled.div`
    display: flex;
    width: 200px;
    justify-content: space-between;
    align-items: center;
    button {
        font-size: 13px;
    }
    @media screen and (max-width: 500px) {
        display: none;
    }
`;
