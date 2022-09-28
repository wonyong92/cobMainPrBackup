import axios from 'axios';
import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/context';
import { IUserProfile } from '../../types';
const UserCard = () => {
    const { user } = useContext(UserContext);
    const [imageUrl, setImageUrl] = useState('');
    const [userInfo, setUserInfo] = useState<IUserProfile>({
        createdAt: '',
        email: '',
        loginId: '',
        nickname: '',
        profileImageId: 0,
    });
    const date = new Date(userInfo.createdAt);
    const createdAt = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일`;
    const getUserData = async () => {
        const res = await axios.get(
            `http://3.39.180.45:56178/member/profile?memberId=${user.memberId}`,
        );
        const data = res.data;
        setUserInfo({ ...data });
    };
    useEffect(() => {
        getUserData();
        setImageUrl(`http://3.39.180.45:56178/member/profileImage/get?memberId=${user.memberId}`);
    }, [user]);
    return (
        <Container>
            <ImgWrapper>
                <img alt="profile" src={imageUrl} />
            </ImgWrapper>
            <InfoWrppaer>
                <div className="nickname">{userInfo.nickname}</div>
                <div className="signedAt">가입일: {createdAt}</div>
            </InfoWrppaer>
        </Container>
    );
};
export default UserCard;
const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: #efeded 0.5px solid;
    padding: 20px;
    @media screen and (max-width: 500px) {
        width: 320px;
    }
`;
const ImgWrapper = styled.div`
    img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
    }
`;
const InfoWrppaer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    .nickname {
        font-size: 13px;
        font-weight: 600;
    }
    .signedAt {
        font-size: 11px;
        color: #464646;
    }
`;
