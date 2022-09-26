import {
    MyHeader,
    Top,
    LogoWrapper,
    LogoSVG,
    Icons,
    Bottom,
    DesktopBtnWrapper,
} from './style';
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
                <Button
                    text={'글쓰기 +'}
                    width={'short'}
                    onClick={() => navigate('/postwrite')}
                />
            </DesktopBtnWrapper>
        </MyHeader>
    );
};
export default Header;
