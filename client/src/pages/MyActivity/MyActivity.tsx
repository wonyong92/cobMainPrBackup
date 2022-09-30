import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
// import PostItem from '../../components/PostItem/PostItem';
import UserCard from '../../components/User/UserCard';
import Button from '../../UI/button/Button';
const MyActivity = () => {
  const [myPosts, setMyPosts] = useState();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [isRenting, setIsRenting] = useState<boolean>(false);
  useEffect(() => {
    const getMyAllPosts = async () => {
      try {
        const res = await axios.get(`http://3.35.90.143:54130/member/rentPosts`, { withCredentials: false });
        setMyPosts(res.data);
      } catch {
        setErrorMsg('지금은 정보를 불러올 수 없습니다. ㅜ_ㅜ');
      }
    };
    getMyAllPosts();
  }, [setMyPosts]);
  return (
    <Container>
      <Title>활동내역</Title>
      <UserCard />
      <SubTitle>
        <div className="subtitle">빌려준내역</div>
        <div className="deActive">빌린내역</div>
      </SubTitle>
      <BtnWrapper>
        <Button
          text={'렌트가능'}
          width="short"
          radius={'deep'}
          type={isRenting ? 'white' : 'default'}
          onClick={() => setIsRenting(false)}
        />
        <Button
          text={'렌트중'}
          width="short"
          radius={'deep'}
          type={isRenting ? 'default' : 'white'}
          onClick={() => setIsRenting(true)}
        />
      </BtnWrapper>
      <p>{errorMsg}</p>
      {myPosts }
      {/* // && <PostItem data=/> */}
    </Container>
  );
};
export default MyActivity;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 980px;
  margin-top: 15px;
  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;

const Title = styled.div`
  text-align: left;
  font-weight: 500;
  margin-bottom: 15px;
`;
const SubTitle = styled.div`
  display: flex;
  align-items: center;
  background-color: #f9fffe;
  border: #efeded 0.5px solid;

  height: 40px;
  .subtitle {
    margin-left: 10px;
    padding-top: 15px;
    padding-bottom: 10px;
    font-size: 12px;
    font-weight: 500;
    color: #95d1cc;
    border-bottom: 3px solid #95d1cc;
    cursor: pointer;
  }
  .deActive {
    font-size: 12px;
    font-weight: 500;
    margin-left: 15px;
    padding-top: 15px;
    padding-bottom: 10px;
    border-bottom: 3px solid transparent;
  }
  @media screen and (max-width: 500px) {
    width: 320px;
  }
`;
const BtnWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
  button {
    margin-right: 5px;
  }
`;
