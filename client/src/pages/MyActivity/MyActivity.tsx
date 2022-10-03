import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostItem from '../../components/PostItem/PostItem';
import UserCard from '../../components/User/UserCard';
import Button from '../../UI/button/Button';
const MyActivity = () => {
  const [myPosts, setMyPosts] = useState({});
  const [errorMsg, setErrorMsg] = useState<string>();
  const [isRenting, setIsRenting] = useState(false);
  const [isMyPost, setIsMyPost] = useState(true);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const getMyAllPosts = async () => {
      if (token) {
        try {
          const res = await axios.get(`http://3.35.90.143:54130/member/rentPosts`, {
            headers: { Authorization: token },
          });
          console.log(res.data);
          setMyPosts(res.data);
        } catch {
          setErrorMsg('지금은 정보를 불러올 수 없습니다. ㅜ_ㅜ');
        }
      }
    };
    getMyAllPosts();
  }, [setMyPosts]);

  return (
    <Container>
      <Title>나의 활동내역</Title>
      <UserCard />
      <SubTitle>
        <div className="subtitle">빌려준 내역</div>
        <div className="deActive">빌린 내역</div>
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
      {/* {myPosts && <PostItem />} */}
      {/* 프롭스1: isMyPost가 트루면 채팅하기 버튼이 postitem 컴포넌트에 보이도록 */}
      {/* 프롭스2:isRenting 팔스면 렌트스테터스가 true인 리스트만보이는 식을 반영해 setMypost에 갱신.  */}
      <Button text={'채팅목록'} width="short" type={'beige'} />
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
  border-left: #efeded 0.5px solid;
  border-right: #efeded 0.5px solid;
  border-bottom: #efeded 0.5px solid;
  height: 40px;
  .subtitle {
    margin-left: 10px;
    padding-top: 15px;
    padding-bottom: 10px;
    font-size: 12px;
    color: #95d1cc;
    border-bottom: 3px solid #95d1cc;
    cursor: pointer;
  }
  .deActive {
    font-size: 12px;
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