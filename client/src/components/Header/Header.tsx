import styled from 'styled-components';
import { ReactComponent as Logo } from '../../asessts/img/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faUser,
    faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MenuModal from '../Modal/MenuModal';

const Header = () => {
    const navigate = useNavigate();
    const [menuModal, setMenuModal] = useState(false);
    return (
        <MyHeader>
            <LogoWrapper onClick={() => navigate(`/`)}>
                <LogoSVG />
                <div className="title">빌리지뭐</div>
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
            {menuModal ? (
                <MenuModal menuModal={menuModal} setMenuModal={setMenuModal} />
            ) : null}
        </MyHeader>
    );
};
export default Header;

const MyHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 350px;
    min-height: 40px;
    padding-top: 5px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f1efef;
    margin-bottom: 15px;
`;
const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .title {
        font-size: 18px;
        padding-top: 3px;
    }
`;
const LogoSVG = styled(Logo)`
    margin: 0 10px;
`;
const Icons = styled.div`
    .icon {
        cursor: pointer;
        color: #95d1cc;
        width: 25px;
        height: 20px;
        margin-left: 10px;
    }
`;
