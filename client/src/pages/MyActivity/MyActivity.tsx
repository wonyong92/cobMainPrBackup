import { useEffect, useState } from 'react';
import { Container, Title, SubTitle } from './style';
import ListItem from '../../components/PostItem/ListItem';
import UserCard from '../../components/User/UserCard';
import { IListItemData } from '../../types';
import { getMyAllActivity } from '../../Utils';
interface IBoolean {
  isMyPost: boolean;
  setIsMyPost: () => {};
}
const MyActivity = () => {
  const [myPosts, setMyPosts] = useState<IListItemData[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [isMyPost, setIsMyPost] = useState(true);

  useEffect(() => {
    const getMyAllPosts = async () => {
      const result = await getMyAllActivity();
      try {
        {
          result.length === 0 ? setErrorMsg('아직 활동내역이 비어있네요 :)') : setMyPosts(result);
        }
      } catch {
        setErrorMsg('지금은 정보를 불러올 수 없습니다. ㅜ_ㅜ');
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
      {myPosts && myPosts.map((el) => <ListItem data={el} key={el.rentPostId} isMyPost={isMyPost} />)}
      {errorMsg ? <p className="errorMsg">{errorMsg}</p> : null}
    </Container>
  );
};
export default MyActivity;
