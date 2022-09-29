import styled from 'styled-components';
import { MyHeader, Top, LogoWrapper, LogoSVG, Icons, Bottom, DesktopTopRight } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import MenuModal from '../Modal/MenuModal';
import TextInput from '../../UI/input/TextInput';
import TextButton from '../../UI/button/TextButton';
import Button from '../../UI/button/Button';
import UserModal from '../Modal/UserModal';
import { UserContext } from '../../context/context';
const TopLeft = styled.div``;
const TopRight = styled.div``;
const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const pathCondition = location.pathname === '/mypage' || location.pathname === '/myactivity';
    const [menuModal, setMenuModal] = useState(false);
    const [userModal, setUserModal] = useState(false);
    const [keyword, setKeyword] = useState<string>('');
    return (
        <MyHeader>
            <Top>
                <TopLeft>
                    <LogoWrapper menuModal={menuModal} onClick={() => navigate(`/`)}>
                        <LogoSVG />
                        <div className="title">빌리지뭐</div>
                        <div className="category" onClick={() => setMenuModal(true)}>
                            카테고리
                        </div>
                    </LogoWrapper>
                </TopLeft>
                <TopRight>
                    <Icons>
                        <Link to={user.memberId ? '/postwrite' : '/login'}>
                            <FontAwesomeIcon icon={faCirclePlus} className="icon" />
                        </Link>
                        <FontAwesomeIcon
                            icon={faBars}
                            onClick={() => setMenuModal(true)}
                            className="icon"
                        />
                        <FontAwesomeIcon
                            icon={faUser}
                            onClick={
                                user.memberId ? () => setUserModal(true) : () => navigate('/login')
                            }
                            className="icon"
                        />
                    </Icons>
                </TopRight>
            </Top>
            {pathCondition ? (
                <Bottom></Bottom>
            ) : (
                <Bottom>
                    <TextInput
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="검색어"
                    />
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="magnify"
                        onClick={() => console.log('hi')}
                    />
                </Bottom>
            )}

            <DesktopTopRight>
                {/* 자식으로 memberId props받기 따로 분리,, 이 안에 userModal을 자식으로*/}
                {user.memberId ? (
                    <FontAwesomeIcon
                        icon={faUser}
                        onClick={
                            user.memberId ? () => setUserModal(true) : () => navigate('/login')
                        }
                        className="icon"
                    />
                ) : (
                    <>
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
                    </>
                )}
                <Link to={user.memberId ? '/postwrite' : '/login'}>
                    <Button text={'글쓰기 +'} width={'short'} />
                </Link>
            </DesktopTopRight>
            {menuModal ? <MenuModal menuModal={menuModal} setMenuModal={setMenuModal} /> : null}
            {user.memberId && userModal ? (
                <UserModal userModal={userModal} setUserModal={setUserModal} />
            ) : null}
        </MyHeader>
    );
};
export default Header;
