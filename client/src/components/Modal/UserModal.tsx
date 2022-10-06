import styled, { keyframes } from 'styled-components';
import { ReactComponent as Logo } from '../../asessts/img/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { UserContext } from '../../context/context';
import TextButton from '../../UI/button/TextButton';
import { useNavigate } from 'react-router-dom';
import { config } from '../../config/config';
const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
interface PropsType {
  userModal: boolean;
  setUserModal: (state: boolean) => void;
}
const UserModal = ({ setUserModal, userModal }: PropsType) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const modalOpen: boolean = userModal ? true : false;
  const imageUrl = `${PROXY}/member/profileImage/get?memberId=${user.memberId}`;
  const closeModal = () => {
    setUserModal(false);
  };
  const trySignout = () => {
    setUser({
      memberId: 0,
      loginId: '',
      email: '',
      name: '',
      nickname: '',
      createdAt: '',
      profileImageId: 0,
    });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };
  return (
    <Container modalOpen={modalOpen}>
      <Top>
        <LogoSVG />
        <FontAwesomeIcon icon={faX} onClick={closeModal} className="icon" />
      </Top>
      <Middle>
        <ImgWrapper>
          <img alt="profile" src={imageUrl} />
        </ImgWrapper>
        <InfoWrapper>
          <div>{user.nickname}</div>
          <div className="loginId">{user.loginId}</div>
        </InfoWrapper>
      </Middle>
      <Bottom>
        <TextButton
          isGray={true}
          btnText="활동내역"
          onClick={() => {
            closeModal();
            navigate('/myactivity');
          }}
        />
        <TextButton
          isGray={true}
          btnText="회원정보"
          onClick={() => {
            closeModal();
            navigate('/mypage');
          }}
        />
        <TextButton isGray={true} btnText="로그아웃" onClick={trySignout} />
      </Bottom>
    </Container>
  );
};
export default UserModal;

export const Container = styled.div<{ modalOpen: boolean }>`
  display: flex;
  animation: ${(props) => (props.modalOpen ? ToBottom : ToTop)} 0.4s;
  flex-direction: column;
  align-items: center;
  position: absolute;
  padding: 15px;
  top: 10px;
  right: 255px;
  width: 300px;
  height: 215px;
  background-color: white;
  z-index: 1;
  box-shadow: rgba(100, 100, 100, 0.1) 1px -1px 3px 2px;
  @media screen and (max-width: 500px) {
    top: 10px;
    width: 320px;
    left: 40px;
  }
`;
const ToBottom = keyframes`
  from {
      transform: translateY(-100%);
  }
  to {
      transform: translate(0%);
  }
`;
const ToTop = keyframes`
  from {
    transform: translate(0%);
  }
  to {
    transform: translateY(-100%);
  }
`;
export const LogoSVG = styled(Logo)``;
export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  .icon {
    font-size: 16px;
    cursor: pointer;
    padding-bottom: 2px;
  }
`;
export const Middle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  margin-top: 10px;
  padding-bottom: 5px;
  border-bottom: 0.5px solid #f0ecec;
`;
export const ImgWrapper = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
`;
export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  .loginId {
    color: #aba8a8;
  }
`;
export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80px;
  width: 90%;
  margin-top: 10px;
  button {
    color: #464646;
    font-size: 14px;
  }
`;
