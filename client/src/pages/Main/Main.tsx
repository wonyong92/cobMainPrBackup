import { getPosts } from '../../Utils/ApiCall';
import styled from 'styled-components';
import PostItem, { PostItemData } from '../../components/PostItem/PostItem';
import { useEffect, useState } from 'react';

const Main = () => {
  const [posts, setPosts] = useState<PostItemData[]>([]);
  const [sortType, setSortType] = useState('writeDate');

  useEffect(() => {
    getPosts(sortType)
      .then((res) => {
        setSortType(res.rentPosts);
        // console.log(res)
        //     let arr = res.rentPosts;
        //     arr=arr.map((el:any)=>el.rentPostId);
        // getImage(arr)
        // .then((image)=>{
        // console.log(res.rentPosts)
        // let obj = {...res?.rentPosts[0], image: image}
        // console.log(obj)
        // console.log(image)
        setPosts(res.rentPosts);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Section>
        <WelcomePage>
          <Title className="title1">
            개인 간 렌탈 플랫폼<br></br> 빌리지뭐
          </Title>
          <SubTitle className="subtitle1">
            살까 말까 고민 된다면<br></br> 지금 여기서 빌리고 써보세요 :)
          </SubTitle>
        </WelcomePage>
        <WelcomePage style={{ backgroundColor: '#FFFCFE' }}>
          <Title className="title2">
            사지말고<br></br> 빌려보세요
          </Title>
          <SubTitle className="subtitle2">
            현명한 소비습관의 시작,<br></br> 지금 경험해보세요!
          </SubTitle>
        </WelcomePage>
      </Section>
      <HeadRow>
        <h2>인기리스트</h2>
      </HeadRow>
      <ItemContainer>{posts && posts.map((el, idx) => <PostItem data={el} key={idx} />)}</ItemContainer>
    </>
  );
};

const Section = styled.div`
  width: 80%;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;
const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;
const HeadRow = styled.div`
  text-align: left;
  width: 80%;
  padding-left: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
`;

const WelcomePage = styled.article`
  background-color: #fffbef;
  height: 20rem;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  .title1 {
    padding-left: 190px;
    @media screen and (max-width: 500px) {
      font-size: 18px;
      padding-left: 18px;
    }
  }
  .subtitle1 {
    padding-left: 190px;
    @media screen and (max-width: 500px) {
      font-size: 15px;
      padding-left: 18px;
    }
  }
  .title2 {
    padding-left: 1400px;
    @media screen and (max-width: 500px) {
      padding-left: 190px;
      font-size: 18px;
    }
  }
  .subtitle2 {
    padding-left: 1400px;
    @media screen and (max-width: 500px) {
      padding-left: 190px;
      font-size: 15px;
    }
  }
`;
const Title = styled.h3`
  padding: 0;
  margin: 0;
  padding-top: 120px;
  padding-left: 20px;
`;

const SubTitle = styled.p`
  padding-left: 20px;
`;

export default Main;
