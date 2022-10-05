import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../UI/button/Button';
import { IListItemData } from '../../types';
interface Props {
  data: IListItemData;
  isMyPost?: boolean;
}
const ListItem = ({ data, isMyPost }: Props) => {
  const navigate = useNavigate();
  const imgUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQBF20H_iscXjbpbSQTRpnQukKDuYfT3Y7dQ&usqp=CAU';
  const price = data.rentPrice?.toLocaleString();
  const location = data.location?.slice(8);
  const createdAt = new Date(String(data.updateDate)).toLocaleDateString().slice(0, 11);
  const goDetailPage = () => {
    navigate(`/postdetail/${data.rentPostId}`);
  };
  return (
    <ListItemContainer key={data.rentPostId}>
      <ImgWrapper onClick={goDetailPage}>
        <img src={imgUrl} />
      </ImgWrapper>
      <ContentWrapper>
        <FirstRow onClick={goDetailPage}>{data.rentPostName}</FirstRow>
        <SecondRow>
          <span>{location}</span>
          <span>{createdAt}</span>
        </SecondRow>
        <ThirdRow>
          <div className="thirdRow">{price}원</div>
        </ThirdRow>
        <FourthRow>
          <span id="tag" className="fourthRow">
            {data.rentStatus ? '렌트중' : '렌트가능'}
          </span>
          {isMyPost ? (
            <Button text={'채팅목록'} width="short" type={'beige'} />
          ) : (
            <span className="fourthRow">조회 {data.viewCount}</span>
          )}
        </FourthRow>
      </ContentWrapper>
    </ListItemContainer>
  );
};

export default ListItem;
const ListItemContainer = styled.div`
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: #efeded 0.5px solid;
`;
const ImgWrapper = styled.div`
  display: flex;
  margin-right: 10px;
  cursor: pointer;
  img {
    width: 110px;
    height: 110px;
    border-radius: 5px;
  }
  @media screen and (max-width: 500px) {
    img {
      width: 90px;
      height: 90px;
    }
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
`;
const FirstRow = styled.div`
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 20px;
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;
const SecondRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #aba8a8;
  span {
    margin-right: 5px;
  }
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;
const ThirdRow = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #464646;
  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;
const FourthRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
  font-size: 12px;

  color: #727272;

  #tag {
    background-color: #95d1cc;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
  }
  @media screen and (max-width: 500px) {
    #tag {
      padding: 3px 8px;
      font-size: 11px;
    }
    button {
      width: 50px;
      height: 25px;
    }
  }
`;
