import { MyHeader, Top, LogoWrapper, LogoSVG, Icons } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import MenuModal from '../Modal/MenuModal';
import UserModal from '../Modal/UserModal';
import SearchBar from '../Search/SearchBar';
import { UserContext } from '../../context/context';
import DesktopRightSide from './DesktopRightSide/DesktopRightSide';
const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuModal, setMenuModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [keyword, setKeyword] = useState<string>('');

  return (
    <MyHeader>
      <Top>
        <LogoWrapper menuModal={menuModal} onClick={() => navigate(`/`)}>
          <LogoSVG />
          <div className="title">빌리지뭐</div>
          <div className="category" onClick={() => setMenuModal(true)}>
            카테고리
          </div>
        </LogoWrapper>
        <Icons>
          <FontAwesomeIcon
            className="icon"
            icon={faCirclePlus}
            onClick={user.memberId ? () => navigate('/postwrite') : () => navigate('/login')}
          />
          <FontAwesomeIcon icon={faBars} onClick={() => setMenuModal(true)} className="icon" />
          <FontAwesomeIcon
            className="icon"
            icon={faUser}
            onClick={user.memberId ? () => setUserModal(true) : () => navigate('/login')}
          />
        </Icons>
      </Top>
      <SearchBar keyword={keyword} setKeyword={setKeyword} />
      <DesktopRightSide userModal={userModal} setUserModal={setUserModal} memberId={user.memberId} />
      {menuModal ? <MenuModal setMenuModal={setMenuModal} /> : null}
      {user.memberId && userModal ? <UserModal userModal={userModal} setUserModal={setUserModal} /> : null}
    </MyHeader>
  );
};
export default Header;
