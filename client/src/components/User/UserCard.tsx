import styled from 'styled-components';
import { useContext } from 'react';
import { UserContext } from '../../context/context';
import { config } from '../../config/config';
const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
const UserCard = () => {
  const { user } = useContext(UserContext);
  const imageUrl = `${PROXY}/member/profileImage/get?memberId=${user.memberId}`;
  let date = user.createdAt;
  const createdAt = date?.slice(0, 10);

  return (
    <Container>
      <ImgWrapper>
        <img alt="profile" src={imageUrl} />
      </ImgWrapper>
      <InfoWrppaer>
        <div className="nickname">{user.nickname}</div>
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
    width: 100%;
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
    font-size: 15px;
    font-weight: 600;
  }
  .signedAt {
    font-size: 13px;
    color: #464646;
  }
  @media screen and (max-width: 500px) {
    .nickname {
      font-size: 13px;
    }
    .signedAt {
      font-size: 11px;
    }
  }
`;
