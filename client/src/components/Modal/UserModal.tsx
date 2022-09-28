import styled from 'styled-components';
import { ReactComponent as Logo } from '../../asessts/img/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/context';
import axios from 'axios';
import TextButton from '../../UI/button/TextButton';
import { useNavigate } from 'react-router-dom';
import { IUserProfile } from '../../types';
interface PropsType {
    userModal: boolean;
    setUserModal: (state: boolean) => void;
}
const UserModal = ({ setUserModal }: PropsType) => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
        setImageUrl(`http://3.39.180.45:56178/member/profileImage/get?memberId=${user.memberId}`);
    }, [user]);
    const [userInfo, setUserInfo] = useState<IUserProfile>({
        createdAt: '',
        email: '',
        loginId: '',
        nickname: '',
        profileImageId: 0,
    });
    const getUserData = async () => {
        const res = await axios.get(
            `http://3.39.180.45:56178/member/profile?memberId=${user.memberId}`,
        );
        const data = res.data;
        setUserInfo({ ...data });
    };

    useEffect(() => {
        getUserData();
    }, [user]);

    const closeModal = () => {
        setUserModal(false);
    };
    const trySignout = () => {
        setUser({ ...user, memberId: null });
        localStorage.removeItem('userInfo');
        navigate('/');
    };
    return (
        <Container>
            <Top>
                <LogoSVG />
                <FontAwesomeIcon icon={faX} onClick={closeModal} className="icon" />
            </Top>
            <Middle>
                <ImgWrapper>
                    <img alt="profile" src={imageUrl} />
                </ImgWrapper>
                <InfoWrapper>
                    <div>{userInfo.nickname}</div>
                    <div className="loginId">{userInfo.loginId}</div>
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

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 270px;
    width: 300px;
    height: 240px;
    background-color: white;
    z-index: 1;
    box-shadow: rgba(100, 100, 100, 0.1) 1px -1px 5px 5px;
    @media screen and (max-width: 500px) {
        top: 10px;
        left: 0.01px;
        right: 0px;
        width: 340px;
        left: 82px;
    }
`;
export const LogoSVG = styled(Logo)``;
export const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin-top: 10px;
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
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    margin-top: 20px;
    button {
        color: #464646;
        font-size: 14px;
    }
`;
